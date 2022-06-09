/* eslint-disable no-undef */
import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import Head from 'next/head';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Button, Icon } from 'react-materialize';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import {
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import styles from '../../../styles/checkIn.module.scss';
import LoadingButton from '../../components/LoadingButton';
import { TextInput } from '../../components/TextInput';
import { schema } from '../../validations/checkIn';
import { db } from '../../firebase/firebaseConfig';
import { useAuthContext } from '../../context/Auth';
import withAuth from '../../logic/withAuth';

interface CheckInFormType {
  name: string;
  position: string;
  telephone: string;
  confirmed: boolean
}

const checkIn: NextPage = () => {
  const [isloading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState<Array<CheckInFormType>>();

  const { uid } = useAuthContext();
  const router = useRouter();
  const id = `${router?.query?.id}`;

  const corfirmedPlayers = useMemo(() => players?.filter((player) => player?.confirmed)?.length, [players]);

  const {
    register, handleSubmit, formState: { errors }, control, reset,
  } = useForm({
    resolver: yupResolver(schema()),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const data = formData as CheckInFormType;

    setIsLoading(true);

    const loadingToast = toast.loading('Carregando...');

    try {
      const docRef = doc(db, 'checkIn', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.data()) {
        const checkInnRef = collection(db, 'checkIn');
        await setDoc(doc(checkInnRef, id), {
          players: [{
            name: data?.name,
            position: data?.position,
            telephone: data?.telephone || null,
            confirmed: true,
          }],
        });
      }

      const checkInRef = doc(db, 'checkIn', id);

      await updateDoc(checkInRef, {
        players: arrayUnion({
          name: data?.name,
          position: data?.position,
          telephone: data?.telephone || null,
          confirmed: true,
        }),
      });

      reset();

      const modal = document.getElementById('modal1') as HTMLElement;
      // eslint-disable-next-line no-undef
      const instance = M.Modal.getInstance(modal);
      instance.close();

      toast.update(loadingToast, {
        render: 'Adicionado com sucesso', type: 'success', isLoading: false, autoClose: 5000,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.update(loadingToast, {
        render: 'Ocoreu um erro ao adiciona um jogador, por favor tente novamente', type: 'error', isLoading: false, autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  });

  const handleUpdatePlayer = useCallback(
    async (index: number) => {
      const checkInnRef = collection(db, 'checkIn');

      const newPlayer = players?.map((player, playerIndex) => (index === playerIndex ? {
        ...player,
        confirmed: !player.confirmed,
      }
        : player));

      await setDoc(doc(checkInnRef, id), {
        players: newPlayer,
      });
    },
    [players, id],
  );

  const handleDelete = useCallback(
    async () => {
      await deleteDoc(doc(db, 'checkIn', id));
    },
    [id],
  );

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    const selectElems = document.querySelectorAll('select');

    M.FormSelect.init(selectElems);
    M.Modal.init(elems);
  }, []);

  useEffect(() => {
    if (db && id) {
      onSnapshot(doc(db, 'checkIn', id), (playersData) => {
        const data = playersData.data();
        setPlayers(data?.players);
      });
    }
  }, [id]);

  return (
    <div className={`container ${styles.container}`}>
      <Head>
        <title>
          Check-in
          {' '}
          | FutStack
        </title>
      </Head>
      <main className="card">
        <header className="row">
          <div className="col s4">
            <p>
              Jogadores:
              {' '}
              {players?.length || 0}
            </p>
          </div>
          <div className="col s4">
            <h1>Check-in</h1>
          </div>
          <div className={`col s4 ${styles.confirmed}`}>
            <div>
              <p>Confrimados</p>
              <p>{corfirmedPlayers || 0}</p>
            </div>

          </div>

        </header>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>

                WhatsApp
              </th>
              <th>Posição</th>
              <th>Confirmado</th>
            </tr>
          </thead>

          <tbody>
            {players?.map((player, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index.toString()}>
                <td>{player?.name}</td>
                <td>
                  <a className={player?.telephone ? '' : 'disabled-link'} href={`https://api.whatsapp.com/send?phone=+${player.telephone}&text=Ol%C3%A1%20${player.name},%20posso%20confirmar%20sua%20presen%C3%A7a%20no%20nosso%20jogo?`} target="_blank" rel="noreferrer">
                    <IoLogoWhatsapp color={player?.telephone ? '#5BD066 ' : '#D3D3D3'} />
                  </a>
                </td>
                <td>{player?.position}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleUpdatePlayer(index)}
                  >
                    <Icon small className={player?.confirmed ? 'sucessColor' : 'errorColor'}>
                      {player?.confirmed ? 'check' : 'close'}
                    </Icon>
                  </button>

                </td>
              </tr>
            ))}

          </tbody>
        </table>

      </main>
      <div id="modal1" className={`modal ${styles.modalContainer}`}>
        <form onSubmit={onSubmit}>
          <div className="modal-content">
            <TextInput register={register} errors={errors} id="name" icon="account_circle" label="Nome" />

            <Controller
              name="telephone"
              control={control}
              render={({ field }) => <PhoneInput {...field} country="br" />}
            />

            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <div className="input-field col s12">
                  <select defaultValue="default" {...field}>
                    <option value="default" disabled>Escolha a posição</option>
                    <option value="Goleiro">Goleiro</option>
                    <option value="Atacante">Atacante</option>
                    <option value="Defesa">Defesa</option>
                  </select>
                </div>
              )}
            />
            <p className="errorLabel">
              {errors?.position?.message}
            </p>

            <LoadingButton type="submit" title="Adicionar" loading={isloading} />
            <a href="#!" className="modal-close waves-effect btn">Cancelar</a>
          </div>
        </form>
      </div>

      <Button
        fab={{
          direction: 'top',
          toolbarEnabled: true,
        }}
        floating
        large
        node="button"
        icon={<Icon>add</Icon>}
      >
        <Button
          node="button"
          waves="light"
          className="btn-large modal-trigger"
          data-target="modal1"
        >
          Adicionar
          <Icon right>
            add
          </Icon>
        </Button>
        {uid === id && (
          <Button
            node="button"
            waves="light"
            className="btn-large"
            data-target="modal1"
          >
            Sortear
            <Icon right>
              sort
            </Icon>
          </Button>
        )}
        {uid === id && (
        <Button
          node="button"
          waves="light"
          className="btn-large modal-trigger"
          onClick={() => handleDelete()}
        >
          Apagar tabela
          <Icon right>
            delete
          </Icon>
        </Button>
        )}
      </Button>
    </div>
  );
};

export default withAuth(checkIn);

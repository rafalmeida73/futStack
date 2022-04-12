import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateProfile, User } from 'firebase/auth';
import Head from 'next/head';
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject,
} from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDays, format } from 'date-fns';
import Loading from '../components/Loading';
import { useAuthContext } from '../context/Auth';
import { auth, db, storage } from '../firebase/firebaseConfig';
import withAuth from '../logic/withAuth';
import styles from '../../styles/EditProfile.module.scss';
import { TextInput } from '../components/TextInput';
import LoadingButton from '../components/LoadingButton';
import ImageInput from '../components/ImageInput';
import { schema } from '../validations/editProfile';

export interface UserType {
  'telephone'?: string,
  'name': string,
  'email': string,
  'birthDdate'?: string
  'photoURL'?: string
}

const EditProfile: NextPage = () => {
  const {
    uid, displayName, email, photoURL,
  } = useAuthContext();

  const [user, setUser] = useState({} as UserType);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({} as File);

  if (!uid) {
    return <Loading />;
  }

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm<UserType>({
    resolver: yupResolver(schema()),
  });

  const getUserData = useCallback(
    async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      setUser((docSnap.data() as UserType));
      setValue('name', String(displayName));
      setValue('telephone', (docSnap.data() as UserType).telephone);
      setValue('birthDdate', format((docSnap.data() as any)?.birthDdate?.toDate?.(), 'yyyy-MM-dd'));
      setValue('email', String(email));
    },
    [displayName, email, setValue, uid],
  );

  const onSubmit = async (data: UserType) => {
    const id = toast.loading('Carregando...');
    setLoading(true);

    if (image?.name) {
      const avatarAlreadyExistsRef = ref(storage, String(photoURL));

      if (avatarAlreadyExistsRef) {
        deleteObject(avatarAlreadyExistsRef);
      }

      const storageRef = ref(storage, `avatar/${uid}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // eslint-disable-next-line no-console
          console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          if ((error as FirebaseError).code === 'storage/unauthorized') {
            toast.error('O usuário não está autorizado a executar a ação desejada.');
          } else if ((error as FirebaseError).code === 'storage/canceled') {
            toast.error('O usuário cancelou a operação.');
          } else {
            toast.error('Ocorreu um erro ao tentar atualizar seu avatar. Por favor, tente novamente mais tarde');
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile((auth.currentUser as User), { photoURL: downloadURL });
          });
        },
      );
    }

    const userRef = doc(db, 'users', uid);

    try {
      await updateDoc(userRef, {
        birthDdate: addDays(new Date(String(data.birthDdate)), 1),
        telephone: data.telephone,
      });

      await updateProfile((auth.currentUser as User), { displayName: data.name });

      toast.update(id, {
        render: 'Dados atualizados com sucesso', type: 'success', isLoading: false, autoClose: 5000,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.update(id, {
        render: 'Ocorreu um erro ao tentar atualizar os seus dados. Por favor, tente novamente mais tarde', type: 'error', isLoading: false, autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [getUserData, uid]);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Editar perfil
          {' '}
          | FutStack
        </title>
      </Head>
      <div className="container">
        <ImageInput setImage={setImage} defaultImage={photoURL || '/profileDefault.png'} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput register={register} errors={errors} label="Nome" icon="account_circle" id="name" defaultValue={String(displayName)} />
          <TextInput register={register} errors={errors} label="E-mail" icon="email" id="email" defaultValue={String(email)} disabled />
          <TextInput register={register} errors={errors} label="Telefone" icon="call" id="telephone" defaultValue={user.telephone} />
          <TextInput register={register} errors={errors} label="Data de Nascimento" icon="date_range" id="birthDdate" type="date" />
          <LoadingButton type="submit" title="Editar" loading={loading} />
        </form>
      </div>

    </div>
  );
};

export default withAuth(EditProfile);

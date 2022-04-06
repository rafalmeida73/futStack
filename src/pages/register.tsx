import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import {
  collection,
  setDoc,
  doc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import styles from '../../styles/Register.module.scss';
import animationData from '../../public/logo.json';
import { PasswordInput } from '../components/PasswordInput';
import { schema } from '../validations/register';
import { TextInput } from '../components/TextInput';
import GoogleButton from '../components/GoogleButton';
import { auth, db } from '../firebase/firebaseConfig';
import LoadingButton from '../components/LoadingButton';

interface RegisterFormType{
  name: string,
  email: string,
  telephone: string,
  birthDdate: string,
  password: string
}

const Register: NextPage = () => {
  const router = useRouter();

  const [isloading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema()),
  });

  const anime = useRef<HTMLDivElement>(null);

  const usersCollectionRef = collection(db, 'users');

  const onSubmit = async (dataForm:RegisterFormType) => {
    setIsLoading(true);

    const id = toast.loading('Carregando...');

    try {
      const response = await createUserWithEmailAndPassword(auth, dataForm.email, dataForm.password);

      await setDoc(doc(usersCollectionRef, response?.user?.uid), {
        name: dataForm.name, telephone: dataForm.telephone, birthDdate: dataForm.birthDdate,
      });

      toast.update(id, {
        render: 'Bem vindo ao FutStack! 🤪', type: 'success', isLoading: false, autoClose: 5000,
      });

      router.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      if ((err as FirebaseError).code === 'auth/email-already-in-use') {
        toast.update(id, {
          render: ' O E-mail digitado já está em uso!', type: 'error', isLoading: false, autoClose: 5000,
        });
      }
      if ((err as FirebaseError).code === 'auth/weak-password') {
        toast.update(id, {
          render: 'A senha fraca está fraca', type: 'error', isLoading: false, autoClose: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData,
      });
    }

    return () => lottie.stop();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Registrar
          {' '}
          | FutStack
        </title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>

        <TextInput register={register} id="name" errors={errors} icon="account_circle" label="Nome" />

        <TextInput register={register} id="email" errors={errors} icon="email" label="E-mail" />

        <TextInput register={register} id="telephone" errors={errors} icon="call" label="Telefone" isTelephone isDate maxLength={15} />

        <TextInput register={register} id="birthDdate" errors={errors} icon="date_range" label="Data de Nascimento" isDate maxLength={10} />

        <PasswordInput register={register} id="password" errors={errors} label="Senha" />

        <LoadingButton type="submit" title="registrar" loading={isloading} />

        <GoogleButton />
      </form>

      <div ref={anime} className={styles.lottie} />

    </div>
  );
};

export default Register;

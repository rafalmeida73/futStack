import { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { FirebaseError } from '@firebase/util';
import styles from '../../styles/Login.module.scss';
import { PasswordInput } from '../components/PasswordInput';
import { TextInput } from '../components/TextInput';
import { schema } from '../validations/login';
import GoogleButton from '../components/GoogleButton';
import { auth } from '../firebase/firebaseConfig';
import LoadingButton from '../components/LoadingButton';

interface LoginFormType{
    email: string;
    password: string;
}

const Login: NextPage = () => {
  const router = useRouter();

  const [isloading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, formState: { errors }, setFocus, getValues,
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema()),
  });

  useEffect(() => {
  }, []);

  const forgotPassword = async () => {
    if (getValues('email')) {
      const id = toast.loading('Carregando...');

      try {
        await sendPasswordResetEmail(auth, getValues('email'));

        toast.update(id, {
          render: 'Por favor, verifique sua caixa e-mail', type: 'success', isLoading: false, autoClose: 5000,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        if ((err as FirebaseError).code === 'auth/user-not-found') {
          toast.update(id, {
            render: 'E-mail não encontrado. Por favor, verifique o e-mail digitado e tente novamente', type: 'error', isLoading: false, autoClose: 5000,
          });
        } else {
          toast.update(id, {
            render: 'Ocorreu um erro ao resetar senha. Por favor, tente mais tarde', type: 'error', isLoading: false, autoClose: 5000,
          });
        }
      }
    } else {
      toast.warning('Por favor, digite um e-mail');
      setFocus('email');
    }
  };

  const onSubmit = async (data:LoginFormType) => {
    setIsLoading(true);

    const id = toast.loading('Carregando...');

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast.update(id, {
        render: 'Bem vindo ao FutStack! 🤪', type: 'success', isLoading: false, autoClose: 5000,
      });

      router.push('/menu');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);

      if ((err as FirebaseError).code === 'auth/user-not-found') {
        toast.update(id, {
          render: 'Usuário não encontrado', type: 'error', isLoading: false, autoClose: 5000,
        });
      } else
      if ((err as FirebaseError).code === 'auth/wrong-password') {
        toast.update(id, {
          render: 'E-mail ou senha incorretos', type: 'error', isLoading: false, autoClose: 5000,
        });
      } else {
        toast.update(id, {
          render: 'Ocorreu um erro ao fazer login. Por favor, tente mais tarde', type: 'error', isLoading: false, autoClose: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className={styles.container}>
      <Head>
        <title>
          Entrar
          {' '}
          | FutStack
        </title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>

        <TextInput register={register} id="email" errors={errors} icon="account_circle" label="E-mail" isEmail />

        <PasswordInput label="Senha" register={register} id="password" errors={errors} />

        <div className={styles.formButtons}>
          <button type="button" onClick={forgotPassword}>Esqueceu sua senha?</button>
          <LoadingButton type="submit" title="Entrar" loading={isloading} />
        </div>
        <GoogleButton />
      </form>

      <div />
      <div className={styles.image}>
        <Image
          src="/goal.svg"
          width={800}
          height={418.86}
          alt="Circulo laranja com uma bola de futebol no centro"
          priority
        />
      </div>

    </div>
  );
};

export default Login;

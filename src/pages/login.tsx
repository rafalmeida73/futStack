import { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
    register, handleSubmit, formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema()),
  });

  useEffect(() => {
  }, []);

  const onSubmit = async (data:LoginFormType) => {
    setIsLoading(true);

    const id = toast.loading('Carregando...');

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast.update(id, {
        render: 'Bem vindo ao FutStack! 🤪', type: 'success', isLoading: false, autoClose: 5000,
      });

      router.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);

      if ((err as FirebaseError).code === 'auth/wrong-password' || (err as FirebaseError).code === 'auth/user-not-found') {
        toast.update(id, {
          render: 'E-mail ou senha incorretos!', type: 'error', isLoading: false, autoClose: 5000,
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

        <TextInput register={register} id="email" errors={errors} icon="account_circle" label="E-mail" />

        <PasswordInput label="Senha" register={register} id="password" errors={errors} />

        <div className={styles.formButtons}>
          <p>Esqueceu sua senha?</p>
          <LoadingButton type="submit" title="registrar" loading={isloading} />
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

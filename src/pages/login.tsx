import { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import {
  signIn,
} from 'next-auth/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import styles from '../../styles/Login.module.scss';
import { PasswordInput } from '../components/PasswordInput';
import { TextInput } from '../components/TextInput';
import { schema } from '../validations/login';
import GoogleButton from '../components/GoogleButton';
import { apiBd } from '../services/apiBd';

interface LoginFormType{
    email: string;
    password: string;
}

const Login: NextPage = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema()),
  });

  useEffect(() => {
  }, []);

  const onSubmit = async (data:LoginFormType) => {
    try {
      await apiBd.post('login', {
        email: data.email,
      });

      signIn('credentials', {
        callbackUrl: '/',
        email: data.email,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      toast.error('Usuário não encontrado. Verifique seu e-mail e senha e tente novamente.');
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
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Entrar
            <i className="material-icons right">send</i>
          </button>
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

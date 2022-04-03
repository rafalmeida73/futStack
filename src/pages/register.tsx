import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import styles from '../../styles/Register.module.scss';
import animationData from '../../public/logo.json';
import { PasswordInput } from '../components/PasswordInput';
import { schema } from '../validations/register';
import { TextInput } from '../components/TextInput';
import { apiBd } from '../services/apiBd';

interface RegisterFormType{
  name: string,
  email: string,
  telephone: string,
  birthDdate: string,
  password: string
}

const Register: NextPage = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema()),
  });

  const anime = useRef<HTMLDivElement>(null);

  const onSubmit = async (dataForm:RegisterFormType) => {
    try {
      await apiBd.post('user', {
        nome: dataForm?.name,
        email: dataForm?.email,
        telefone: dataForm?.telephone,
        nascimento: dataForm?.birthDdate,
      });
      // eslint-disable-next-line no-alert
      alert('foi!!!!!!!!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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

        <TextInput register={register} id="telephone" errors={errors} icon="call" label="Telefone" />

        <TextInput register={register} id="birthDdate" errors={errors} icon="date_range" label="Data de Nascimento" />

        <PasswordInput register={register} id="password" errors={errors} label="Senha" />

        <div className={styles.formButtons}>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Registrar
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>

      <div ref={anime} className={styles.lottie} />

    </div>
  );
};

export default Register;

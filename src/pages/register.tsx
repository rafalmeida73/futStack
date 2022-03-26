import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styles from '../../styles/Register.module.scss';
import animationData from '../../public/logo.json';
import { PasswordInput } from '../components/PasswordInput';
import { schema } from '../validations/register';
import { TextInput } from '../components/TextInput';
import { nextI18NextConfig } from '../../next-i18next.config';

interface RegisterFormType{
  name: string,
  email: string,
  telephone: string,
  birthDdate: string,
  password: string
}

const Register: NextPage = () => {
  const { t } = useTranslation('register');

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema({ t })),
  });

  const anime = useRef<HTMLDivElement>(null);

  const onSubmit = (data:RegisterFormType) => { console.log(data); };

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
          {t('title')}
          {' '}
          | FutStack
        </title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>

        <TextInput register={register} id="name" errors={errors} icon="account_circle" label={t('name')} />

        <TextInput register={register} id="email" errors={errors} icon="email" label={t('email')} />

        <TextInput register={register} id="telephone" errors={errors} icon="call" label={t('telephone')} />

        <TextInput register={register} id="birthDdate" errors={errors} icon="date_range" label={t('birthDate')} />

        <PasswordInput register={register} id="password" errors={errors} label={t('password')} />

        <div className={styles.formButtons}>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            {t('signIn')}
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>

      <div ref={anime} className={styles.lottie} />

    </div>
  );
};

export const getStaticProps = async ({ locale } :{locale: string}) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['home', 'header', 'footer', 'login', 'register'],
      nextI18NextConfig,
    )),
  },
});

export default Register;

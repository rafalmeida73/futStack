import { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styles from '../../styles/Login.module.scss';
import { PasswordInput } from '../components/PasswordInput';
import { TextInput } from '../components/TextInput';
import { schema } from '../validations/login';
import { nextI18NextConfig } from '../../next-i18next.config';

interface LoginFormType{
    email: string;
    password: string;
}

const Login: NextPage = () => {
  const { t } = useTranslation('login');

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema({ t })),
  });

  const onSubmit = (data:LoginFormType) => { console.log(data); };

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

        <TextInput register={register} id="email" errors={errors} icon="account_circle" label={t('email')} />

        <PasswordInput label={t('password')} register={register} id="password" errors={errors} />

        <div className={styles.formButtons}>
          <p>{t('forgotPassowrd')}</p>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            {t('signIn')}
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>

      <div className={styles.image}>
        <Image
          src="/goal.svg"
          width={800}
          height={418.86}
          alt={t('imageAlt')}
        />
      </div>

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

export default Login;

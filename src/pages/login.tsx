import { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../../styles/Login.module.scss';
import { PasswordInput } from '../components/PasswordInput';
import { TextInput } from '../components/TextInput';
import { schema } from '../validations/login';

interface LoginFormType{
    email: string;
    password: string;
}

const Login: NextPage = () => {
  const { t } = useTranslation();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema({ t })),
  });

  const onSubmit = (data:LoginFormType) => { console.log(data); };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextInput register={register} id="email" errors={errors} icon="account_circle" label={t('login.email')} />

        <PasswordInput label={t('login.password')} register={register} id="password" errors={errors} />

        <div className={styles.formButtons}>
          <p>{t('login.forgotPassowrd')}</p>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            {t('login.signIn')}
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>

      <div className={styles.image}>
        <Image
          src="/goal.svg"
          width={800}
          height={418.86}
          alt={t('login.imageAlt')}
        />
      </div>

    </div>
  );
};

export default Login;

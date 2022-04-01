import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Head from 'next/head';
import styles from '../../styles/404.module.scss';
import { nextI18NextConfig } from '../../next-i18next.config';
import animationData from '../../public/404.json';

const pages: NextPage = () => {
  const { t } = useTranslation('404');

  const anime = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData,
      });
    }

    return () => lottie.stop();
  }, []);

  return (
    <main className={styles.container}>
      <Head>
        <title>
          {t('title')}
          {' '}
          | FutStack
        </title>
      </Head>
      <div ref={anime} className={styles.lottie} />
      <p>{t('errorMessage')}</p>
    </main>
  );
};

export const getStaticProps = async ({ locale } :{locale: string}) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['header', 'footer', '404'],
      nextI18NextConfig,
    )),
  },
});

export default pages;

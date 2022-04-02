import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Head from 'next/head';
import styles from '../../styles/404.module.scss';
import animationData from '../../public/404.json';

const NotFound: NextPage = () => {
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
          404
          {' '}
          | FutStack
        </title>
      </Head>
      <div ref={anime} className={styles.lottie} />
      <p>Error 404: Página não encontrada</p>
    </main>
  );
};

export default NotFound;

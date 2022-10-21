/* eslint-disable no-undef */
import { NextPage } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { minutesToSeconds } from 'date-fns';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import styles from '../../../styles/cronometro.module.scss';
import Timer from '../../components/Timer';
import animationData from '../../../public/twisted.json';

import withAuth from '../../logic/withAuth';

const cronometro: NextPage = () => {
  const router = useRouter();
  const anime = useRef<HTMLDivElement>(null);

  const id = `${router?.query?.id}`;

  const time = new Date();
  time.setSeconds(time.getSeconds() + minutesToSeconds(Number(id)));

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
    <div className={`container ${styles.container}`}>
      <Head>
        <title>
          Cronômetro
          {' '}
          | FutStack
        </title>
      </Head>
      <main>
        <div className={`${styles.content} row`}>
          <div className="col s12 m6 l6">
            <Timer expiryTimestamp={time} />
          </div>
          <div className="col s12 m6 l6">
            <div ref={anime} className={styles.lottie} />
          </div>

        </div>
      </main>

    </div>
  );
};

export default withAuth(cronometro);

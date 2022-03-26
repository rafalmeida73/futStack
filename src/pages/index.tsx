import type { NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Button } from 'react-materialize';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

import { nextI18NextConfig } from '../../next-i18next.config';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {t('title')}
          {' '}
          | FutStack
        </title>
      </Head>
      <main>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo ornare tincidunt quis suscipit.</p>

        <div className={styles.image}>
          <Image
            src="/player.png"
            width={659.62}
            height={631.44}
            alt={t('home.playerImageAlt')}
          />
        </div>
      </main>
      <div className={styles.separatorUp}>
        <Image
          src="/line.svg"
          width={80.86}
          height={58.03}
          alt={t('home.lineImageAlt')}
        />
      </div>

      <div className={`${styles.card} row container`}>
        <div className="col s12 m4 l4">
          <div className={styles.cardContent}><p>beneficios</p></div>
        </div>
        <div className="col s12 m4 l4">
          <div className={styles.cardContent}><p>beneficios</p></div>

        </div>
        <div className="col s12 m4 l4">
          <div className={styles.cardContent}><p>beneficios</p></div>

        </div>
      </div>

      <div className={styles.separatorDown}>
        <Image
          src="/curvedLine.svg"
          width={100.86}
          height={150.84}
          alt={t('home.lineCurvedImageAlt')}
        />
      </div>

      <div className={`${styles.description} row container`}>
        <div className="col s12 m6 l6">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo ornare tincidunt quis suscipit.</p>
          <Button
            node="button"
            waves="light"
          >
            {t('signUp')}
          </Button>
        </div>
        <div className={`${styles.soccerImage} col s12 m6 l6`}>
          <Image
            src="/soccer.svg"
            width={856.97}
            height={510.43}
            alt={t('home.soccerImageAlt')}
          />
        </div>
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

export default Home;

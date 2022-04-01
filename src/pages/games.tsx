import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/Games.module.scss';
import { nextI18NextConfig } from '../../next-i18next.config';
import { api } from '../services/api';
import { Stadings } from '../util/types/stadings';

interface NewsProps{
  standings: Stadings
}

const Games = ({ standings } : NewsProps) => {
  const { t } = useTranslation('games');

  const [data, setData] = useState(standings);

  useEffect(() => {
    const dataObject = localStorage.getItem('standings');

    if (Object?.keys(standings)?.length > 0 && standings?.response?.length > 0 && !dataObject) {
      localStorage.setItem('standings', JSON.stringify(data));
    }

    if (Object?.keys(standings)?.length > 0 && standings?.response?.length > 0 && dataObject && standings !== JSON.parse(dataObject)) {
      localStorage.setItem('standings', JSON.stringify(data));
    }

    if (Object?.keys(standings)?.length === 0 && dataObject) {
      setData(JSON.parse(dataObject));
    } else {
      setData(standings);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>
            {t('title')}
            {' '}
            | FutStack
          </title>
        </Head>
        <main className="container">
          <div>
            {data?.response?.[0]?.league?.flag && (
            <Image
              src={data?.response?.[0]?.league?.flag}
              width={100}
              height={100}
              alt={data?.response?.[0]?.league?.country}
              priority
            />
            )}
            <p>{data?.response?.[0]?.league?.name}</p>
          </div>
          <table className="striped">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Clube</th>
                <th>Pts</th>
                <th>Vit</th>
                <th>E</th>
                <th>D</th>
                <th>GP</th>
                <th>GC</th>
              </tr>
            </thead>
            <tbody>

              {data?.response?.[0]?.league?.standings?.[0]?.map((rank, index) => (
                <tr key={rank?.rank}>
                  <td>
                    {index + 1}
                    º
                  </td>
                  <td>{rank?.team?.name}</td>
                  <td>{rank?.points}</td>
                  <td>{rank?.all?.win}</td>
                  <td>{rank?.all?.draw}</td>
                  <td>{rank?.all?.lose}</td>
                  <td>{rank?.all?.goals?.for}</td>
                  <td>{rank?.all?.goals.against}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </main>
      </div>

      {Object?.keys(standings)?.length > 0 && (
      <div className={`${styles.live} container`}>
        <p>{t('games')}</p>
        <div
          id="wg-api-football-livescore"
          data-host="v3.football.api-sports.io"
          data-refresh="0"
          data-key={process.env.NEXT_PUBLIC_API_KEY_FOOTBALL}
          data-show-errors="false"
          className="api_football_loader"
        />
      </div>
      )}
    </>
  );
};

export async function getStaticProps({ locale } :{locale: string}) {
  const { data } = await api.get('/standings');

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['header', 'footer', 'games'],
        nextI18NextConfig,
      )),
      standings: data,
    },
  };
}

export default Games;

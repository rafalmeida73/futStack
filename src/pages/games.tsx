import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  Button, Dropdown, Icon,
} from 'react-materialize';
import styles from '../../styles/Games.module.scss';
import { Stadings } from '../utils/types/stadings';
import { api } from '../services/api';

const Games = () => {
  const [data, setData] = useState({} as Stadings);

  const getStadings = async (league :string) => {
    try {
      const { data: standings } = await api.get<Stadings>(`/standings/${league}`);
      setData(standings);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getStadings('71');
  }, []);

  useEffect(() => {
    const dataObject = localStorage.getItem('standings');

    if (data && Object?.keys(data)?.length > 0 && data?.response?.length > 0 && !dataObject) {
      localStorage.setItem('standings', JSON.stringify(data));
    }

    if (data && Object?.keys(data)?.length > 0 && data?.response?.length > 0 && dataObject && data !== JSON.parse(dataObject)) {
      localStorage.setItem('standings', JSON.stringify(data));
    }

    if (data && Object?.keys(data)?.length === 0 && dataObject) {
      setData(JSON.parse(dataObject));
    }
  }, [data]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>
            Jogos
            {' '}
            | FutStack
          </title>
        </Head>
        <main className="container">
          <div className={styles.tableHeader}>
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
              <Dropdown
                id="Dropdown_8"
                options={{
                  alignment: 'left',
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  outDuration: 250,
                }}
                trigger={(
                  <Button
                    node="button"
                    style={{
                      marginRight: '5px',
                    }}
                    waves="light"
                  >
                    Alterar liga
                    <Icon left>
                      arrow_drop_down
                    </Icon>
                  </Button>
                )}
              >
                <button type="button" onClick={() => getStadings('71')}>
                  Campeonato brasileiro
                </button>
                <button type="button" onClick={() => getStadings('2')}>
                  Liga dos Campeões da UEFA
                </button>
              </Dropdown>
            </div>
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

      {data && Object.keys(data).length > 0 && (
        <div className={`${styles.live} container`}>
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

export default Games;

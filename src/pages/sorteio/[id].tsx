/* eslint-disable no-undef */
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import {
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import styles from '../../../styles/sorteio.module.scss';

import withAuth from '../../logic/withAuth';
import { db } from '../../firebase/firebaseConfig';

interface SorteioType {
  name: string;
  position: string;
  telephone: string;
  confirmed: boolean
}

const sorteio: NextPage = () => {
  const router = useRouter();

  const id = `${router?.query?.id}`;

  const [players, setPlayers] = useState<Array<SorteioType>>();

  const goalkeepers = useMemo(() => players?.filter((player) => player.position === 'Goleiro' && player.confirmed).sort(() => Math.random() - 0.5), [players]);
  const attackers = useMemo(() => players?.filter((player) => player.position === 'Atacante' && player.confirmed).sort(() => Math.random() - 0.5), [players]);
  const defenses = useMemo(() => players?.filter((player) => player.position === 'Defesa' && player.confirmed).sort(() => Math.random() - 0.5), [players]);

  useEffect(() => {
    if (db && id) {
      onSnapshot(doc(db, 'checkIn', id), (playersData) => {
        const data = playersData.data();
        setPlayers(data?.players);
      });
    }
  }, [id]);

  return (
    <div className={`container ${styles.container}`}>
      <Head>
        <title>
          Sorteio
          {' '}
          | FutStack
        </title>
      </Head>
      <main>
        <section className={`${styles.teamOne} row`}>
          <div className="col s12 m6">
            <h3>Time 1</h3>

            <div>

              <table className="striped highlight">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Posição</th>
                  </tr>
                </thead>
                <tbody>
                  {goalkeepers && (
                  <tr>
                    <td>{goalkeepers?.[0]?.name}</td>
                    <td>Goleiro</td>
                  </tr>
                  )}

                  {defenses?.slice(0, (defenses.length / 2)).map((defense, index) => (
                    <tr key={`${defense?.name}-${index}`}>
                      <td>{defense?.name}</td>
                      <td>Defensor</td>
                    </tr>
                  ))}

                  {attackers?.slice(0, (attackers.length / 2)).map((attacker, index) => (
                    <tr key={`${attacker?.name}-${index}`}>
                      <td>{attacker?.name}</td>
                      <td>Atacante</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

          </div>
          <div className="col s12 m6">
            <h3>Time 2</h3>

            <div>

              <table className="striped highlight">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Posição</th>
                  </tr>
                </thead>
                <tbody>
                  {goalkeepers && (
                  <tr>
                    <td>{goalkeepers?.[1]?.name}</td>
                    <td>Goleiro</td>
                  </tr>
                  )}

                  {defenses?.slice((defenses.length / 2), defenses.length).map((defense, index) => (
                    <tr key={`${defense?.name}-${index}`}>
                      <td>{defense?.name}</td>
                      <td>Defensor</td>
                    </tr>
                  ))}

                  {attackers?.slice((attackers.length / 2), attackers.length).map((attacker, index) => (
                    <tr key={`${attacker?.name}-${index}`}>
                      <td>{attacker?.name}</td>
                      <td>Atacante</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default withAuth(sorteio);

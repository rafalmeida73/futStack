import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Icon } from 'react-materialize';
import styles from '../../styles/Home.module.scss';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>
        Início
        {' '}
        | FutStack
      </title>
    </Head>
    <main>
      <p>FutStack é o aplicativo perfeito para organizar as partidas de Futebol que acontecem nos bairros, no clube, no condomínio ou qualquer lugar!</p>

      <div className={styles.image}>
        <Image
          src="/player.png"
          width={659.62}
          height={631.44}
          alt="Circulo cinza escuro com um homem dominando a bola no peito"
          priority
        />
      </div>
    </main>
    <div className={styles.separatorUp}>
      <Image
        src="/line.svg"
        width={80.86}
        height={58.03}
        alt="linha laranja"
      />
    </div>

    <div className={`${styles.card} row container`}>
      <div className="col s12 m4 l4">
        <div className={styles.cardContent}>
          <Icon large>
            directions_run
          </Icon>
          <p>Gerenciamento dos seus jogos de uma forma rápida.</p>
        </div>
      </div>
      <div className="col s12 m4 l4">
        <div className={styles.cardContent}>
          <Icon large>
            attach_money
          </Icon>
          <p>Gerencie o financeiro da sua partida de uma forma fácil.</p>
        </div>

      </div>
      <div className="col s12 m4 l4">
        <div className={styles.cardContent}>
          <Icon large>
            timeline
          </Icon>
          <p>Veja as estatísticas da partidas e jogadores.</p>
        </div>

      </div>
    </div>

    <div className={styles.separatorDown}>
      <Image
        src="/curvedLine.svg"
        width={100.86}
        height={150.84}
        alt="linha laranja curvada"
      />
    </div>

    <div className={`${styles.description} row container`}>
      <div className="col s12 m6 l6">
        <p>Conheça o aplicativo ideal para gerenciar as partidas de futebol nos bairros, Clube, Condominio ou qualquer lugar sem propaganda, zero tóxico e 100% Futebol!</p>
        <Link
          href="/register"
        >
          Registrar
        </Link>
      </div>
      <div className={`${styles.soccerImage} col s12 m6 l6`}>
        <Image
          src="/soccer.svg"
          width={856.97}
          height={510.43}
          alt="Ilustração de um homem fazendo embaixadinha"
        />
      </div>
    </div>
  </div>
);

export default Home;

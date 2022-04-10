import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Menu.module.scss';
import Loading from '../components/Loading';
import MenuCard from '../components/MenuCard';
import { useAuthContext } from '../context/Auth';
import withAuth from '../logic/withAuth';

const Menu: NextPage = () => {
  const { displayName, uid, photoURL } = useAuthContext();

  if (!uid) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>
          Início
          {' '}
          | FutStack
        </title>
      </Head>
      <div className={`${styles.container} container`}>
        <div className={`${styles.header} row`}>
          <div className="col s6 m6 l6">
            <h5>
              Olá,
              {' '}
              {' '}
              {displayName}
            </h5>
          </div>
          <div className="col s6 m6 l6">
            <Link href="/editProfile">
              <Image
                src={photoURL || '/profileDefault.png'}
                width={80}
                height={80}
                alt={`Avatar ${displayName}`}
                title="Editar perfil"
              />
            </Link>
          </div>
        </div>
      </div>
      <main className={styles.menu}>
        <div className="row container">
          <div className="col s6 s6 l6">
            <MenuCard icon="attach_money" title="Financeiro" link="/menu" />
          </div>
          <div className="col s6 s6 l6">
            <MenuCard icon="date_range" title="Agendamentos" link="/menu" />
          </div>
          <div className="col s6 s6 l6">
            <MenuCard icon="directions_run" title="Partidas" link="/menu" />
          </div>
          <div className="col s6 s6 l6">
            <MenuCard icon="timeline" title="Estatísticas" link="/menu" />
          </div>

        </div>
      </main>
    </>
  );
};

export default withAuth(Menu);

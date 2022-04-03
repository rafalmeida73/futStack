import { NextPage } from 'next';
import { Navbar, Icon } from 'react-materialize';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import styles from './Header.module.scss';

const Header: NextPage = () => {
  const { data } = useSession();

  return (
    <div className={`navbar-fixed ${styles.container}`}>
      <Navbar
        alignLinks="right"
        brand={(
          <div title="Início">
            <Link href="/">
              <a>
                <Image
                  src="/logo.svg"
                  width={90}
                  height={60}
                  alt="Circulo laranja com uma bola de futebol no centro"
                />
                <p>FutStack</p>
              </a>
            </Link>

          </div>
        )}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <Link href="/">
          <a>Início</a>
        </Link>
        <Link href="/games">
          <a>Jogos</a>
        </Link>
        {data && (
          <button type="button" onClick={() => signOut({ callbackUrl: '/login' })}>
            <a>Sair</a>
          </button>
        )}
        {!data && (
        <Link href="/login">
          <a>Login</a>
        </Link>
        )}
        {!data && (
        <Link href="/register">
          <a>Registrar</a>
        </Link>
        )}

      </Navbar>
    </div>
  );
};

export default Header;

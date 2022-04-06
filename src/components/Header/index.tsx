import { NextPage } from 'next';
import { Navbar, Icon } from 'react-materialize';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import { useAuthContext } from '../../comtext/Auth';
import { auth } from '../../firebase/firebaseConfig';

const Header: NextPage = () => {
  const { isLogged } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);

    router.push('login');
  };

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
        {isLogged && (
          <button type="button" onClick={handleSignOut}>
            <a>Sair</a>
          </button>
        )}
        {!isLogged && (
        <Link href="/login">
          <a>Login</a>
        </Link>
        )}
        {!isLogged && (
        <Link href="/register">
          <a>Registrar</a>
        </Link>
        )}

      </Navbar>
    </div>
  );
};

export default Header;

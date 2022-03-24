import { NextPage } from 'next';
import { Navbar, Icon } from 'react-materialize';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

const Header: NextPage = () => (
  <div className={styles.container}>
    <Navbar
      alignLinks="right"
      id="mobile-nav"
      brand={(
        <a href="#">
          <Image
            src="/logo.svg"
            width={200}
            height={60}
            alt="Circulo laranja com uma bola de futebol no centro"
          />
          <p>FutStack</p>
        </a>
    )}
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
        <a>Home</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>

    </Navbar>
  </div>
);

export default Header;

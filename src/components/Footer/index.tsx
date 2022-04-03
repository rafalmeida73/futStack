import { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-materialize';
import styles from './Footer.module.scss';

export const Footer: NextPage = () => {
  const { data } = useSession();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  return (
    <footer className={`page-footer ${styles.container}`}>
      <div className="container">
        <div className="row">
          <div className="col l9 s12">
            <h5 className="white-text">FutStack</h5>
          </div>
          <div className="col l2  s12">
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/games">Jogos</Link></li>
              {data ? (
                <li>
                  <button type="button" onClick={() => signOut({ callbackUrl: '/login' })}>
                    <a>Sair</a>
                  </button>
                </li>
              )
                : (
                  <>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Registrar</Link></li>
                  </>
                )}

            </ul>
          </div>
          <div className={`col l1 s12 ${styles.image}`}>
            <Button
              node="button"
              tooltip="Ir para o topo"
              waves="light"
              onClick={scrollToTop}
            >
              <Image
                src="/up.svg"
                width={50}
                height={50}
                alt="Seta apontando para cima"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2022 Copyright
        </div>
      </div>
    </footer>
  );
};

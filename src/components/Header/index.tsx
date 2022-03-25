import { NextPage } from 'next';
import { Navbar, Icon } from 'react-materialize';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import styles from './Header.module.scss';

const Header: NextPage = () => {
  const { t } = useTranslation('header');

  return (
    <div className={`navbar-fixed ${styles.container}`}>
      <Navbar
        alignLinks="right"
        brand={(
          <a title={t('home')}>
            <Link href="/">
              <Image
                src="/logo.svg"
                width={90}
                height={60}
                alt={t('logoImageAlt')}
              />
            </Link>
            <Link href="/">
              <p>FutStack</p>
            </Link>
          </a>
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
          <a>{t('home')}</a>
        </Link>
        <Link href="/login">
          <a>{t('signIn')}</a>
        </Link>
        <Link href="/register">
          <a>{t('signUp')}</a>
        </Link>
      </Navbar>
    </div>
  );
};

export default Header;

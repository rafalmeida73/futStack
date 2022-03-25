import { NextPage } from 'next';
import { Navbar, Icon } from 'react-materialize';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

export const Header: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div className={`navbar-fixed ${styles.container}`}>
      <Navbar
        alignLinks="right"
        brand={(
          <a title={t('header.start')}>
            <Link href="/">
              <Image
                src="/logo.svg"
                width={90}
                height={60}
                alt={t('header.logoImageAlt')}
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
          <a>{t('header.home')}</a>
        </Link>
        <Link href="/login">
          <a>{t('header.login')}</a>
        </Link>
        <Link href="/register">
          <a>{t('header.register')}</a>
        </Link>
      </Navbar>
    </div>
  );
};

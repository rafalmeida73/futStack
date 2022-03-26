import { NextPage } from 'next';
import { Navbar, Icon } from 'react-materialize';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import styles from './Header.module.scss';

const Header: NextPage = () => {
  const { t } = useTranslation('header');

  return (
    <div className={`navbar-fixed ${styles.container}`}>
      <Head>
        <meta
          name="description"
          content={t('content')}
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:description"
          content={t('content')}
        />

        {/* Twitter */}
        <meta
          property="twitter:description"
          content={t('content')}
        />
      </Head>
      <Navbar
        alignLinks="right"
        brand={(
          <div title={t('home')}>
            <Link href="/">
              <a>
                <Image
                  src="/logo.svg"
                  width={90}
                  height={60}
                  alt={t('logoImageAlt')}
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

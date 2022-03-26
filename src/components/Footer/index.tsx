import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button } from 'react-materialize';
import styles from './Footer.module.scss';

export const Footer: NextPage = () => {
  const { t } = useTranslation('footer');

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
              <li><Link href="/">{t('home')}</Link></li>
              <li><Link href="/login">{t('signIn')}</Link></li>
              <li><Link href="/register">{t('signUp')}</Link></li>
            </ul>
          </div>
          <div className={`col l1 s12 ${styles.image}`}>
            <Button
              node="button"
              tooltip={t('scrollToTop')}
              waves="light"
              onClick={scrollToTop}
            >
              <Image
                src="/up.svg"
                width={50}
                height={50}
                alt={t('upImageAlt')}
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

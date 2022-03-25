import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export const Footer: NextPage = () => {
  const { t } = useTranslation();

  return (
    <footer className={`page-footer ${styles.container}`}>
      <div className="container">
        <div className="row">
          <div className="col l9 s12">
            <h5 className="white-text">FutStack</h5>
          </div>
          <div className="col l2  s12">
            <ul>
              <li><Link href="/">{t('header.home')}</Link></li>
              <li><Link href="/login">{t('header.login')}</Link></li>
              <li><Link href="/register">{t('header.register')}</Link></li>
            </ul>
          </div>
          <div className={`col l1 s12 ${styles.image}`}>
            <Image
              src="/up.svg"
              width={50}
              height={50}
              alt={t('footer.upImageAlt')}
            />
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

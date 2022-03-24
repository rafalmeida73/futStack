import type { AppProps } from 'next/app';
import '../../styles/globals.scss';
import 'materialize-css/dist/css/materialize.min.css';
import '../i18';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

import type { AppProps } from 'next/app';
import '../../styles/globals.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <ToastContainer autoClose={3000} />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>

  );
}

export default MyApp;

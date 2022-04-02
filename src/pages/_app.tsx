import type { AppProps } from 'next/app';
import '../../styles/globals.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { appWithTranslation } from 'next-i18next';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { SessionProvider } from 'next-auth/react'
import {AccessTokenRequest} from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Header />
      <SessionProvider session={session}>
      <Component {...pageProps} />

      
    </SessionProvider>

    
      <Footer />
    </>
    
  );
}

export default appWithTranslation(MyApp);

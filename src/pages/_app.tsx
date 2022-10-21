import type { AppProps } from 'next/app';
import '../../styles/globals.scss';
import 'materialize-css/dist/css/materialize.min.css';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from '../context/Auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Header />
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
      <Footer />
    </AuthContextProvider>

  );
}

export default MyApp;

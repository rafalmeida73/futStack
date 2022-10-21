import { NextComponentType } from 'next';
import Loading from '../components/Loading';
import { useAuthContext } from '../context/Auth';

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { uid } = useAuthContext();

    if (!uid) {
      return <Loading />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;

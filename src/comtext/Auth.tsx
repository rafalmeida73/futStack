import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

type AuthContextType = {
  isLogged: boolean;
};

const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider: React.FC = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, [onAuthStateChanged]);

  const value = useMemo(() => ({
    isLogged,
  }), [isLogged]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('No context on AuthContext');
  }
  return context;
};

export { useAuthContext };
export default AuthContextProvider;

import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext({} as User);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser({} as User);
      }
    });
  }, [onAuthStateChanged]);

  const value = useMemo(() => (user), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): User => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('No context on AuthContext');
  }
  return context;
};

export { useAuthContext };
export default AuthContextProvider;

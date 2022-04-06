import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FirebaseError } from '@firebase/util';
import { auth, db } from '../../firebase/firebaseConfig';
import styles from './GoogleButton.module.scss';

const GoogleButton: NextPage = () => {
  const usersCollectionRef = collection(db, 'users');

  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const id = toast.loading('Carregando...');

    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithPopup(auth, provider);

      GoogleAuthProvider.credentialFromResult(response);

      const docRef = doc(db, 'users', response?.user?.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(usersCollectionRef, response?.user?.uid), {
          name: response?.user?.displayName, telephone: response?.user?.phoneNumber, photoURL: response?.user?.photoURL,
        });
      }

      toast.update(id, {
        render: 'Bem vindo ao FutStack! 🤪', type: 'success', isLoading: false, autoClose: 5000,
      });
      router.push('/');
    } catch (error) {
      toast.update(id, {
        render: 'Ocorreu um erro ao tentar fazer login com o google. Por favor, tente novamente mais tarde', type: 'error', isLoading: false, autoClose: 5000,
      });
      GoogleAuthProvider.credentialFromError((error as FirebaseError));
    }
  };

  return (
    <div className={styles.google}>
      <button className="btn waves-effect waves-light" type="button" onClick={() => handleLoginWithGoogle()}>
        <Image
          src="/google.svg"
          width={32}
          height={32}
          alt="Logo do google (Letra G)"
          priority
        />
      </button>
    </div>
  );
};

export default GoogleButton;

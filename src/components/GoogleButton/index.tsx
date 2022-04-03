import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import styles from './GoogleButton.module.scss';

const GoogleButton: NextPage = () => (
  <div className={styles.google}>
    <button className="btn waves-effect waves-light" type="button" onClick={() => signIn('google', { callbackUrl: '/' })}>
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

export default GoogleButton;

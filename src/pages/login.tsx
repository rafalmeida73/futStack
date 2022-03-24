import { NextPage } from 'next';
import Image from 'next/image';
import { TextInput } from 'react-materialize';
import styles from '../../styles/Login.module.scss';

const Login: NextPage = () => (
  <div className={styles.container}>
    <form>
      <TextInput
        icon="email"
        id="emailInput"
        label="E-mail"
      />
      <TextInput
        icon="lock"
        id="passwordInput"
        label="Senha"
      />

      <div className={styles.formButtons}>
        <p>Esqueceu sua senha?</p>
        <button className="btn waves-effect waves-light" type="submit" name="action">
          Entrar
          <i className="material-icons right">send</i>
        </button>
      </div>
    </form>

    <div className={styles.image}>
      <Image
        src="/goal.svg"
        width={800}
        height={418.86}
        alt="Circulo laranja com uma bola de futebol no centro"
      />
    </div>

  </div>
);

export default Login;

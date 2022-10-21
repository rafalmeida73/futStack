import {
  useCallback, useRef, useEffect, useState,
} from 'react';
import { Icon } from 'react-materialize';
import { useTimer } from 'react-timer-hook';
import lottie from 'lottie-web';
import { toast } from 'react-toastify';
import styles from './Timer.module.scss';
import animationData from '../../../public/twisted.json';

interface TimerProps {
  expiryTimestamp: Date;
}

const Timer = ({ expiryTimestamp }: TimerProps) => {
  const [expire, setExpire] = useState(false);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    pause,
    resume,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      setExpire(true);
      toast.info('A partida acabou!');
      toast.info('A partida acabou!');
      toast.info('A partida acabou!');
    },
  });

  const anime = useRef<HTMLDivElement>(null);

  const handleStart = useCallback(() => {
    if (isRunning) {
      pause();
      return;
    }

    resume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  useEffect(() => {
    if (anime.current) {
      lottie.loadAnimation({
        container: anime.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData,
      });
    }

    return () => lottie.stop();
  }, []);

  return (
    <div className={`${styles.container} row`}>
      <section className={styles.stopWatch}>
        <div>
          <span>{hours}</span>

          <span>{minutes}</span>

          <span>{seconds}</span>
        </div>

        <button type="button" onClick={handleStart} className="waves-effect waves-light btn">
          {
            isRunning ? <Icon>pause</Icon> : <Icon>play_arrow</Icon>
          }
        </button>

        {expire && (
          <p>Acabou!</p>
        )}
      </section>
    </div>
  );
};

export default Timer;

import Link from 'next/link';
import { Icon } from 'react-materialize';

import styles from './MenuCard.module.scss';

interface MenuCardProps{
  icon: string;
  title: string;
  link: string;
}

const MenuCard = ({ icon, title, link }:MenuCardProps) => (
  <Link href={link || '/'}>
    <div className={styles.container}>
      <Icon large>
        {icon}
      </Icon>
      <p>{title}</p>
    </div>
  </Link>
);

export default MenuCard;

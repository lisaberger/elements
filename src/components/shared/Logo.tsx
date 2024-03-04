import { FC } from 'react';
import styles from './Logo.module.scss';
import logo from '/elements-rgb-wort-bild.svg';

interface LogoProps {
    size: 'small' | 'medium' | 'large';
}

const Logo: FC<LogoProps> = ({ size }) => {
    const logoClassName = styles[`logo-${size}`];

    return (
        <img
            className={`${logoClassName} ${styles.logo}`}
            src={logo}
            alt="Elements Logo"
        />
    );
};

export default Logo;

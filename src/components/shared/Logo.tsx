import { FC } from 'react';
import styles from './Logo.module.scss';
import logo from '/elements-rgb-wort-bild.svg';

interface LogoProps {
    size: 'small' | 'medium' | 'large';
    onClick?: () => void;
}

const Logo: FC<LogoProps> = ({ size, onClick }) => {
    const logoClassName = styles[`logo-${size}`];

    const handleClick = () => {
        onClick();
    };

    return (
        <img
            className={`${logoClassName} ${styles.logo}`}
            src={logo}
            alt="Elements Logo"
            onClick={handleClick}
        />
    );
};

export default Logo;

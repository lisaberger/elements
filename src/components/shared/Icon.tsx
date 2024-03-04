import { FC } from 'react';
import styles from './Icon.module.scss';

interface IconProps {
    icon: 'arrow-left' | 'arrow-right' | 'x';
    onClick?: () => void;
}

import xIcon from '/icons/x.png';
import arrowLeftIcon from '/icons/arrow-left.png';
import arrowRightIcon from '/icons/arrow-right.png';

const Icon: FC<IconProps> = ({ icon, onClick }) => {
    let iconSource;

    switch (icon) {
        case 'arrow-left':
            iconSource = arrowLeftIcon;
            break;
        case 'arrow-right':
            iconSource = arrowRightIcon;
            break;
        case 'x':
            iconSource = xIcon;
            break;
    }

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <img
            className={styles.icon}
            src={iconSource}
            alt={icon}
            onClick={handleClick}
        />
    );
};

export default Icon;

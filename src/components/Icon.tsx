import { FC } from 'react';
import styles from './Icon.module.scss';

interface IconProps {
    icon: 'arrow-left' | 'arrow-right' | 'x';
    onClick?: () => void;
}

import xIcon from '/x.png';
import arrowLeftIcon from '/arrow-left.png';
import arrowRightIcon from '/arrow-right.png';

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
        onClick();
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

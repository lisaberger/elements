import { useNavigate } from 'react-router-dom';
import styles from './Start.module.scss';

import logo from '/elements-rgb-wort-bild.svg';
import Button from './Button';

const Start = () => {
    const navigate = useNavigate();

    const handleAppStart = () => {
        navigate('/all');
    };

    return (
        <div className={`${styles.start} flex flex-column align-items-center`}>
            <img src={logo} className={`${styles.start__logo} mb-2`} />
            <p className={`${styles.start__text} text-sm`}>
                Get to know all the chemical elements from a new perspective
                with this interactive 3D application. We break the rigid
                structure of the periodic table to present the important
                properties in new ways using the 3D space.
            </p>
            <Button label="start" onClick={handleAppStart} />
        </div>
    );
};

export default Start;

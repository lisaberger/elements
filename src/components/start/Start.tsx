import { useNavigate } from 'react-router-dom';
import Logo from '@/components/shared/Logo';
import styles from './Start.module.scss';
import Button from './Button';

const Start = () => {
    const navigate = useNavigate();

    const handleAppStart = () => {
        navigate('/all');
    };

    return (
        <div className={`${styles.start} flex flex-column align-items-center`}>
            <Logo size="medium" />
            <p className={`${styles.start__text} text-sm my-2`}>
                Get to know all the chemical elements from a new perspective
                with this interactive 3D application. We break the rigid
                structure of the periodic table to present the important
                properties in new ways using the 3D space.
            </p>
            <Button label="Start" onClick={handleAppStart} />
        </div>
    );
};

export default Start;

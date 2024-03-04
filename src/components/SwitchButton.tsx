import styles from './SwitchButton.module.scss';
import { useState, FC } from 'react';

interface SwitchButtonProps {
    onToggle: (isChecked: boolean) => void; // Benutzerdefinierte Funktion, die beim Umschalten aufgerufen wird
}

const SwitchButton: FC<SwitchButtonProps> = ({ onToggle }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onToggle(newState);
    };

    return (
        <div className={styles.toggle}>
            <label className={styles.toggleSwitch}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <span className={styles.toggleSlider}></span>
            </label>
        </div>
    );
};

export default SwitchButton;

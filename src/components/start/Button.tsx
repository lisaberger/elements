import { FC, MouseEvent } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    label: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
const Button: FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className={`${styles.button} text-white px-6 py-3 mt-4 border rounded-lg hover:border-primary active:text-primary`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;

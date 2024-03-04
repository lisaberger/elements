import Logo from '@/components/shared/Logo';
import { useNavigate } from 'react-router-dom';
import SwitchButton from '../components/SwitchButton';
import { FC, useState } from 'react';

interface HeaderProps {
    onTypeChange: (type: 'Helix' | 'Table') => void;
    type: 'Helix' | 'Table';
}

const Header: FC<HeaderProps> = ({ onTypeChange, type }) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/all');
    };

    const typeChange = () => {
        if (type === 'Helix') {
            onTypeChange('Table');

            return;
        }

        onTypeChange('Helix');
    };

    return (
        <header
            style={{ position: 'absolute', zIndex: 2 }}
            className="p-4 flex justify-content-between w-full"
        >
            <Logo size="medium" onClick={onClickHandler} />
            <div className="flex align-items-center">
                <p className="text-white text-sm mr-2">{type}</p>
                <SwitchButton onToggle={typeChange} />
            </div>
        </header>
    );
};

export default Header;

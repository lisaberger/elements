import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitchButton from '@/components/overview/SwitchButton';
import Logo from '@/components/shared/Logo';

interface HeaderProps {
    onTypeChange: (type: 'Helix' | 'Table') => void;
    type: 'Helix' | 'Table';
}

const Header: FC<HeaderProps> = ({ onTypeChange, type }) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/');
    };

    const typeChange = () => {
        if (type === 'Helix') {
            onTypeChange('Table');

            return;
        }

        onTypeChange('Helix');
    };

    return (
        <header className="p-4 flex justify-content-between w-full absolute z-5">
            <Logo size="medium" onClick={onClickHandler} />
            <div className="flex align-items-center">
                <p className="text-white text-sm mr-2">{type}</p>
                <SwitchButton onToggle={typeChange} />
            </div>
        </header>
    );
};

export default Header;

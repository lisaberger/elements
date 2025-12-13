import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/shared/Logo';
import SelectButton from '@/components/ui/SelectButton';

interface HeaderProps {
    onTypeChange: (type: 'Helix' | 'Table') => void;
    type: 'Helix' | 'Table';
}

const Header: FC<HeaderProps> = ({ onTypeChange }) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/');
    };

    return (
        <header className="p-4 flex justify-between w-full absolute z-5">
            <Logo size="medium" onClick={onClickHandler} />
            <div className="flex items-center">
                <SelectButton
                    initialValue='Helix'
                    options={['Helix', 'Table']} 
                    onChange={ (type) => onTypeChange(type as 'Helix' | 'Table')} 
                />
            </div>
        </header>
    );
};

export default Header;

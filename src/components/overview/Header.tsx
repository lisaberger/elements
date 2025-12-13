import { useNavigate } from 'react-router-dom';
import Logo from '@/components/_ui/Logo';
import SelectButton from '@/components/_ui/SelectButton';
import { ViewType } from '@/types/View.interface';
import { HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    onTypeChange: (type: ViewType) => void;
    type: ViewType;
}

const VIEW_OPTIONS: ViewType[] = [ViewType.Helix, ViewType.Table];

function Header({ onTypeChange }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="p-4 md:px-8 flex justify-between w-full absolute z-5">
            <Logo 
                src="/logo/elements-rgb-wort-bild.svg" 
                onClick={() => navigate('/')} 
            />
            
            <SelectButton
                initialValue='Helix'
                options={VIEW_OPTIONS} 
                onChange={ (type: string) => onTypeChange(type as ViewType)}
                className='my-2'
            />
        </header>
    );
};

export default Header;

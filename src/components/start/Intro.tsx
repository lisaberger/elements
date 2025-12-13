import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { useTranslation } from "react-i18next";
import Icon from '../ui/Icon';
import { IconName } from '@/icons';

function Intro() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAppStart = () => {
        navigate('/all');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center relative">
            <Logo src="/logo/elements-rgb-wort-bild.svg" />

            <p className="max-w-md mt-4 mb-8 px-8">
                {t('intro')}
            </p>

            <Button onClick={handleAppStart}>
                {t('buttons.run')}
                <Icon name={IconName.RocketLaunch} className='ml-2 inline-block'/>
            </Button>
        </div>
    );
};

export default Intro;

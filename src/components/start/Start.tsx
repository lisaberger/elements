import { useNavigate } from 'react-router-dom';
import Logo from '@/components/shared/Logo';
import Button from './Button';
import { useTranslation } from "react-i18next";

function Start() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAppStart = () => {
        navigate('/all');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center relative">
            <Logo size="medium" />

            <p className="max-w-md my-2">
              {t('intro')}
            </p>

            <Button 
                label={t('buttons.run')}
                onClick={handleAppStart} 
            />
        </div>
    );
};

export default Start;

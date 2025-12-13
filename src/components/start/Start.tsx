import { useNavigate } from 'react-router-dom';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';
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

            <p className="max-w-md mt-4 mb-8">
                {t('intro')}
            </p>

            <Button onClick={handleAppStart}>
                {t('buttons.run')}
            </Button>
        </div>
    );
};

export default Start;

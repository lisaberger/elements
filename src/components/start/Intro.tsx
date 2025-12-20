import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/logo/elements-rgb-wort-bild.svg';
import { Icon, Button, Logo } from '@/components';
import { IconName } from '@/icons';
import { RouteName } from '@/router';

export function Intro() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAppStart = () => {
        void navigate(RouteName.Overview);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center relative">
            <Logo src={logo} />

            <p className="max-w-md mt-4 mb-8 px-8">{t('intro')}</p>

            <Button onClick={handleAppStart}>
                {t('buttons.run')}
                <Icon name={IconName.RocketLaunch} className="ml-2 inline-block" />
            </Button>
        </div>
    );
}

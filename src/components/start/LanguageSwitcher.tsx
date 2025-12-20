import { useTranslation } from 'react-i18next';

import { supportedLanguages } from '../../i18n';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div className="absolute top-5 right-8 text-white font-bold">
            <div>
                <select
                    value={i18n.resolvedLanguage}
                    onChange={(e) => void i18n.changeLanguage(e.target.value)}
                >
                    {Object.entries(supportedLanguages).map(([code, name]) => (
                        <option value={code} key={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

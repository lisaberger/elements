import { useTranslation } from 'react-i18next';

import { elementAttributeConfig, type ElementAttributeKey } from './element-attribute-config';
import { StandardStates } from './StandardStates';
import type { Element, StandardState } from '@/types';

interface InfoProps {
    element: Element | null;
}

export function Info({ element }: InfoProps) {
    const { t } = useTranslation('element');

    if (!element) return null;

    return (
        <div className="flex flex-col items-center text-white">
            <div className="text-center">
                <p>{element.atomicNumber}</p>
                <h1 className="text-8xl leading-none">{element.symbol}</h1>
                <h2 className="text-2xl font-medium">{element.name}</h2>
            </div>

            <div className="mt-10">
                {Object.entries(elementAttributeConfig).map(([key, { labelKey, unit }]) => {
                    const typedKey = key as ElementAttributeKey;
                    const value = element[typedKey];

                    if (!value) return null;

                    return (
                        <p key={key}>
                            <span className="font-medium">{t(labelKey)}: </span>
                            {value}
                            {unit && ` ${unit}`}
                        </p>
                    );
                })}
            </div>

            <div className="mt-4">
                <p>
                    <StandardStates state={element.standardState as StandardState} />
                </p>
                <p className="mt-1">
                    <span className="font-medium">{t('attributes.standardState')} </span>
                    {element.standardState}
                </p>
            </div>
        </div>
    );
}

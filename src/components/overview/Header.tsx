import { type HTMLAttributes } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/logo/elements-rgb-wort-bild.svg';
import { Logo, Search, SelectButton } from '@/components';
import { RouteName } from '@/router/route-name';
import { useAppDispatch, useAppSelector, setSearchQuery } from '@/store';
import { ViewType } from '@/types';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    onTypeChange: (type: ViewType) => void;
    type: ViewType;
}

const VIEW_OPTIONS: ViewType[] = [ViewType.Helix, ViewType.Table];

export function Header({ onTypeChange }: HeaderProps) {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const searchQuery = useAppSelector((state) => state.search.query);

    const { t } = useTranslation();

    return (
        <header className="p-4 md:px-8 flex justify-between w-full absolute z-5">
            <Logo src={logo} onClick={() => void navigate(RouteName.Home)} />

            <Search
                value={searchQuery}
                placeholder={t('search')}
                onChange={(value) => dispatch(setSearchQuery(value))}
                className="my-2"
            />

            <SelectButton
                initialValue="Helix"
                options={VIEW_OPTIONS}
                onChange={(type: string) => onTypeChange(type as ViewType)}
                className="my-2"
            />
        </header>
    );
}

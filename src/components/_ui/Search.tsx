import { type ChangeEvent } from 'react';

import clsx from 'clsx';

import { Icon } from './Icon';
import { IconName } from '@/icons';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function Search({ value, onChange, placeholder = 'Search…', className }: SearchBarProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
    };

    const handleSearchClick = (): void => {
        onChange(value);
    };

    return (
        <span className="flex w-full  max-w-1/3 items-center">
            <input
                type="search"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={clsx(
                    'px-4 py-2 rounded-lg rounded-r-none border bg-transparent text-white outline-none w-full',
                    'border-white/30 focus:border-primary',
                    className,
                )}
            />

            <button
                type="button"
                onClick={handleSearchClick}
                className="px-6 py-2 rounded-lg rounded-l-none border-l-none border border-white/30 hover:border-primary bg-primary text-white"
            >
                <Icon name={IconName.MagnifyingGlass} />
            </button>
        </span>
    );
}

import { ChangeEvent } from 'react';
import clsx from 'clsx';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

function SearchBar({
    value,
    onChange,
    placeholder = 'Search…',
    className,
}: SearchBarProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleSearchClick = () => {
        onChange(value);
    };

    return (
        <span className="flex gap-2 items-center">
            <input
                type="search"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={clsx(
                    'px-4 py-2 rounded-lg border bg-transparent text-white outline-none',
                    'border-white/30 focus:border-primary',
                    className
                )}
            />

            <button
                type="button"
                onClick={handleSearchClick}
                className="px-3 py-2 rounded-lg border border-white/30 hover:border-primary text-white"
            >
                Search
            </button>
        </span>
    );
}

export default SearchBar;

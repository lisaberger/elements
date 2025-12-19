import { type ChangeEvent } from 'react';

import clsx from 'clsx';

export interface DropdownOption<T extends string = string> {
    label: string;
    value: T;
}

export interface DropdownProps<T extends string = string> {
    options: DropdownOption<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    id?: string;
    className?: string;
    disabled?: boolean;
}

const Dropdown = <T extends string>({
    options,
    value,
    onChange,
    placeholder = 'Select option',
    id,
    className,
    disabled = false,
}: DropdownProps<T>) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as T);
    };

    return (
        <select
            id={id}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={clsx(
                'bg-transparent text-white px-3 py-2 rounded-lg border border-white/30 hover:border-primary focus:outline-none focus:border-primary',
                className,
            )}
        >
            {placeholder && (
                <option value="" disabled hidden>
                    {placeholder}
                </option>
            )}

            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;

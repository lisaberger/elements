import { useState } from 'react';

import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export interface SelectButtonProps {
    options: string[];
    initialValue: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onChange?: (value: string) => void;
}

const optionStyles = cva('px-4 cursor-hand select-none transition-colors text-center rounded-md', {
    variants: {
        size: {
            sm: 'text-sm px-3 py-1.5',
            md: 'text-base px-4 py-2',
            lg: 'text-lg px-6 py-3',
        },
        active: {
            true: 'bg-primary text-white',
            false: 'bg-transparent text-white hover:bg-white/10',
        },
    },
    defaultVariants: {
        size: 'md',
        active: false,
    },
});

const containerStyles = cva(
    'inline-flex border border-white/30 rounded-lg overflow-hidden bg-transparent',
);

const SelectButton = ({
    ref,
    options,
    initialValue,
    size = 'md',
    className,
    onChange,
    ...props
}: SelectButtonProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
    const [value, setValue] = useState(initialValue);

    const handleClick = (option: string) => {
        setValue(option);
        onChange?.(option);
    };

    return (
        <div ref={ref} className={clsx(containerStyles(), className)} {...props}>
            {options.map((option) => {
                const isActive = option === value;
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleClick(option)}
                        className={optionStyles({ size, active: isActive })}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
};

export default SelectButton;

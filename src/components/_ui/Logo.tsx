import { type ImgHTMLAttributes, type RefObject } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export type LogoSize = 'small' | 'medium' | 'large';
export type LogoVariant = 'primary' | 'secondary' | 'monochrome';

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof logoStyles> {
    src: string;
    size?: LogoSize;
    variant?: LogoVariant;
    onClick?: () => void;
    className?: string;
}

const logoStyles = cva(
    'object-contain cursor-hand transition-all duration-300',

    {
        variants: {
            size: {
                small: 'w-24', // ~96px
                medium: 'w-48', // ~192px
                large: 'w-64', // ~256px
            },
            variant: {
                primary: 'filter-none',
                secondary: 'filter grayscale contrast-125',
                monochrome: 'filter grayscale brightness-0',
            },
        },
        defaultVariants: {
            size: 'medium',
            variant: 'primary',
        },
    },
);

export function Logo({
    ref,
    src,
    size = 'medium',
    variant = 'primary',
    className,
    onClick,
    ...props
}: LogoProps & { ref?: RefObject<HTMLImageElement | null> }) {
    return (
        <img
            ref={ref}
            src={src}
            alt="Elements Logo"
            onClick={onClick}
            className={clsx(
                logoStyles({ size, variant }),
                className,
                onClick && 'hover:scale-105 active:scale-95',
            )}
            {...props}
        />
    );
}

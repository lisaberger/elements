import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const buttonVariants = cva(
    // Base styles
    'bg-transparent border border-white rounded-lg text-white ' +
        'transition-all duration-500 ease-in-out ' +
        'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
        'disabled:opacity-50 disabled:pointer-events-none',

    {
        variants: {
            variant: {
                primary:
                'hover:border-primary active:text-primary hover:cursor-hand',
            },

            size: {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-6 py-3 text-base',
                lg: 'px-8 py-4 text-lg',
            },
        },

        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            isLoading,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={clsx(buttonVariants({ variant, size }), className)}
                disabled={disabled || isLoading}
                {...props}
            >
            {isLoading ? (
                <span className="animate-spin">⏳</span>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;

import { type HTMLAttributes } from 'react';

import { icons } from '@/icons';

interface IconProps extends HTMLAttributes<SVGElement | HTMLImageElement> {
    name: string;
    size?: number | string;
    className?: string;
    alt?: string;
    color?: string;
}

function Icon({ name, size = 24, color, className, alt }: IconProps) {
    const icon = icons[name];

    if (!icon) return null;

    if (typeof icon === 'string') {
        return (
            <img src={icon} alt={alt ?? name} width={size} height={size} className={className} />
        );
    }

    const SvgIcon = icon;
    return (
        <SvgIcon
            width={size}
            height={size}
            stroke={color ?? 'currentColor'}
            className={className}
        />
    );
}

export default Icon;

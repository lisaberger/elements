import { type ComponentType, type SVGProps } from 'react';

// Heroicons
import {
    HomeIcon,
    UserIcon,
    RocketLaunchIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    PlayIcon,
    StopIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

// SVGs
import ArrowLeftPng from './arrow-left.png';
import ArrowRightPng from './arrow-right.png';
import CursorPointerSvg from './cursor-arrow.svg';
import CursorHandSvg from './cursor-hand.svg';
// PNGs
import xPng from './x.png';

export const enum IconName {
    Home = 'home',
    User = 'user',
    RocketLaunch = 'rocketLaunch',
    X = 'x',
    ArrowLeft = 'arrowLeft',
    ArrowRight = 'arrowRight',
    CursorArrow = 'cursorArrow',
    CursorHand = 'cursorHand',
    MagnifyingGlass = 'magnifyingGlass',
    Funnel = 'funnel',
    AdjustmentsHorizontal = 'adjustmentsHorizontal',
    Play = 'play',
    Stop = 'stop',
}

export const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>> | string> = {
    // Heroicons
    [IconName.Home]: HomeIcon,
    [IconName.User]: UserIcon,
    [IconName.RocketLaunch]: RocketLaunchIcon,
    [IconName.MagnifyingGlass]: MagnifyingGlassIcon,
    [IconName.Funnel]: FunnelIcon,
    [IconName.Play]: PlayIcon,
    [IconName.Stop]: StopIcon,
    [IconName.AdjustmentsHorizontal]: AdjustmentsHorizontalIcon,

    // Custom SVG
    [IconName.CursorArrow]: CursorPointerSvg,
    [IconName.CursorHand]: CursorHandSvg,

    // Custom PNG
    [IconName.ArrowRight]: ArrowRightPng,
    [IconName.ArrowLeft]: ArrowLeftPng,
    [IconName.X]: xPng,
};

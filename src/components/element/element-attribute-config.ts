import type { Element } from '@/types';

export type ElementAttributeKey = Extract<
    keyof Element,
    | 'atomicMass'
    | 'atomicRadius'
    | 'boilingPoint'
    | 'density'
    | 'electronegativity'
    | 'bondingType'
    | 'groupBlock'
    | 'yearDiscovered'
>;

export const elementAttributeConfig: Record<
    ElementAttributeKey,
    { labelKey: string; unit?: string }
> = {
    atomicMass: { labelKey: 'attributes.atomicMass', unit: 'u' },
    atomicRadius: { labelKey: 'attributes.atomicRadius', unit: 'pm' },
    boilingPoint: { labelKey: 'attributes.boilingPoint', unit: 'K' },
    density: { labelKey: 'attributes.density', unit: 'g/cm³' },
    electronegativity: { labelKey: 'attributes.electronegativity' },
    bondingType: { labelKey: 'attributes.bondingType' },
    groupBlock: { labelKey: 'attributes.groupBlock' },
    yearDiscovered: { labelKey: 'attributes.yearDiscovered' },
};

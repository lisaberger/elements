import { type Element } from '@/types';

/**
 * Determines the electron distribution in different shells based on the given element's electronic configuration.
 * @param element - The element for which to determine the electron distribution.
 * @returns An array representing the electron distribution in different shells of the atom.
 */
export const determineAtomConfiguration = (element: Element): number[] => {
    // Mapping of electron configurations to the number of shells and base configuration
    const configMapping: Record<string, { shells: number; baseConfig: string }> = {
        '[He]': { shells: 2, baseConfig: '1s2' },
        '[Ne]': { shells: 3, baseConfig: '1s2 2s2 2p6' },
        '[Ar]': { shells: 4, baseConfig: '1s2 2s2 2p6 3s2 3p6' },
        '[Kr]': { shells: 5, baseConfig: '1s2 2s2 2p6 3s2 3p6 4s2 4p6' },
        '[Xe]': {
            shells: 6,
            baseConfig: '1s2 2s2 2p6 3s2 3p6 4s2 4p6 5s2 5p6',
        },
        '[Rn]': {
            shells: 7,
            baseConfig: '1s2 2s2 2p6 3s2 3p6 4s2 4p6 5s2 5p6 4f14 5d10 6s2 6p6',
        },
    };

    // Default to 1 shell
    let numShells = 1;
    let config = element.electronicConfiguration;

    // Loop through the configuration mapping and update values if a match is found
    for (const [key, value] of Object.entries(configMapping)) {
        if (config.includes(key)) {
            numShells = value.shells;
            config = value.baseConfig + config.substring(key.length);
            break;
        }
    }

    // Split the modified configuration into parts and initialize an array for electron distribution
    const parts = config.split(' ');
    const electronDistribution = new Array(numShells).fill(0) as number[];

    // Determine electron distribution for each shell
    for (const part of parts) {
        const shellNumber = parseInt(part.substring(0, 1));
        const count = parseInt(part.substring(2));
        electronDistribution[shellNumber - 1] += count;
    }

    return electronDistribution;
};

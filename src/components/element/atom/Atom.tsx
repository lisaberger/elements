import { AtomCore } from './AtomCore';
import { AtomShell } from './AtomShell';
import type { Element } from '@/types/Element.interface';
import { determineAtomConfiguration } from '@/utils';

interface AtomProps {
    element: Element;
    state?: { paused: boolean };
}

export function Atom({ element, state }: AtomProps) {
    const atomConfiguration = determineAtomConfiguration(element);

    const atomicNumber = +element.atomicNumber;
    // total number of electrons
    const numElectrons = atomicNumber;

    // total number of neutrons / protons
    let nucleusNumber: number;

    if (atomicNumber === 1) {
        nucleusNumber = 2;
    } else {
        nucleusNumber = 2 * numElectrons + 1;
    }

    return (
        <>
            <AtomCore nucleusNumber={nucleusNumber} />
            <AtomShell electronDistribution={atomConfiguration} paused={state?.paused} />
        </>
    );
}

import { FC } from 'react';
import type { Element } from '@/types/Element.interface';
import { determineAtomConfiguration } from '@/utils/determineAtomConfiguration';
import AtomShell from '@/components/element/atom/AtomShell';
import AtomCore from '@/components/element/atom/AtomCore';

interface AtomProps {
    element: Element;
    state?: { paused: boolean };
}

const Atom: FC<AtomProps> = ({ element, state }) => {
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
};
export default Atom;

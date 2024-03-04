import { FC } from 'react';
import type { Element } from '../../types/Element.interface';
import { determineAtomConfiguration } from '../../utils/determineAtomConfiguration';
import AtomShell from './AtomShell';
import AtomCore from './AtomCore';

interface AtomProps {
    element: Element;
}

const Atom: FC<AtomProps> = ({ element }) => {
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
            <AtomShell electronDistribution={atomConfiguration} />
        </>
    );
};
export default Atom;

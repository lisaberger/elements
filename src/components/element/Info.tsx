import { StandardStates } from './StandardStates';
import type { Element } from '@/types/Element.interface';

interface InfoProps {
    element: Element | null;
}

export function Info({ element }: InfoProps) {
    return (
        element && (
            <div className="flex flex-col items-center text-white">
                <div className="flex flex-col items-center">
                    <p className="text-">{element.atomicNumber}</p>
                    <h1 className="text-8xl line-height-1">{element.symbol}</h1>
                    <h2 className="text-2xl mb-4 font-medium">{element.name}</h2>
                </div>

                <div className="p-4">
                    <p className="text-base">
                        <span>Group block: </span>
                        <span>{element.groupBlock}</span>
                    </p>
                    <p className="text-base">
                        <span>Bonding type: </span>
                        <span>{element.bondingType}</span>
                    </p>
                    <p className="text-base">
                        <span>Boiling point: </span>
                        <span>{element.boilingPoint}</span>
                    </p>
                    <p className="text-base">
                        <span>Electronegativity: </span>
                        <span>{element.electronegativity}</span>
                    </p>
                    <p className="text-base">
                        <span>Year discovered: </span>
                        <span>{element.yearDiscovered}</span>
                    </p>
                </div>

                <div>
                    <StandardStates state={element.standardState as 'solid' | 'liquid' | 'gas'} />
                </div>

                <p className="text-base">
                    <span>Standard state: </span>
                    {element.standardState}
                </p>
            </div>
        )
    );
}

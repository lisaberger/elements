import { FC } from 'react';
import type { Element } from '@/types/Element.interface';

interface InfoProps {
    element: Element | null;
}

const Info: FC<InfoProps> = ({ element }) => {
    const standardStates: { [key: string]: string } = {
        liquid: '/states/fluid_gif_800px_transparent.gif',
        solid: '/states/cube_gif_800px_transparent.gif',
        gas: '/states/cloud_gif_800px_violet.gif',
    };

    return (
        element && (
            <div className="flex flex-column align-items-center text-white">
                <div className="flex flex-column align-items-center">
                    <p className="text-">{element.atomicNumber}</p>
                    <h1 className="text-8xl line-height-1">{element.symbol}</h1>
                    <h2 className="text-2xl mb-4 font-medium">
                        {element.name}
                    </h2>
                </div>
                <div className="p-4">
                    <p className="text-base">
                        <span>Group block: </span>
                        <span>{element.groupBlock}</span>
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
                <img
                    className="w-8"
                    src={standardStates[element.standardState]}
                />
                <p className="text-base">
                    <span>Standard state: </span>
                    {element.standardState}
                </p>
            </div>
        )
    );
};

export default Info;

import { FC, JSX, useMemo } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import Element from '@/components/overview/Element';
import type { Element as IElement } from '../types/Element.interface';

interface TableProps {
    elements: IElement[];
}

const Table: FC<TableProps> = ({ elements }) => {
    const { camera } = useThree();

    const textures = useLoader(
        TextureLoader,
        Array.from(
            { length: 118 },
            (_, i) => `${import.meta.env.BASE_URL}textures/textures_elements_${i}.png`,
        ),
    );

    // rows and cols for the grid
    let row = Math.round(118 / 16 / 2) - 1;
    let col = -8;
    let counter = 0;

    camera.position.set(0, 0, -15);

    const tableElements = useMemo(() => {
        const result: JSX.Element[] = [];

        for (let i = 0; i < elements.length; i++) {
            if (col > 8) {
                row--;
                col = -8;
            }
            result.push(
                <Element
                    key={i}
                    position={new Vector3(col * 1.8, row * 2.5, 0)}
                    texture={textures[+elements[i].atomicNumber]}
                    index={+elements[i].atomicNumber}
                />,
            );
            // increase the column
            col++;
            // increase c for each found element
            counter++;
        }
        return result;
    }, [elements, textures]);

    return <>{tableElements}</>;
};

export default Table;

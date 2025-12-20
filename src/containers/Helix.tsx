import { type JSX, useMemo } from 'react';

import { useThree, useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';

import { Element } from '@/components';
import type { Element as IElement } from '@/types';

interface HelixProps {
    elements: IElement[];
}

export function Helix({ elements }: HelixProps) {
    const { camera } = useThree();

    const textures = useLoader(
        TextureLoader,
        Array.from(
            { length: 118 },
            (_, i) => `${import.meta.env.BASE_URL}textures/textures_elements_${i}.png`,
        ),
    );

    camera.position.set(0, 0, -15);

    const helixElements = useMemo(() => {
        const result: JSX.Element[] = [];

        for (let i = 0; i < elements.length; i++) {
            const theta = i * 0.175 + Math.PI;
            const y = -(i * 0.05) + 3;
            result.push(
                <Element
                    key={i}
                    position={new Vector3().setFromCylindricalCoords(8, theta, y)}
                    texture={textures[+elements[i].atomicNumber - 1]}
                    index={+elements[i].atomicNumber}
                />,
            );
        }
        return result;
    }, [elements, textures]);

    return <>{helixElements}</>;
}

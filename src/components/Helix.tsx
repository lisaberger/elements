import { useThree, useLoader } from '@react-three/fiber';
import { FC, useMemo } from 'react';
import { TextureLoader, Vector3 } from 'three';
import Element from '@/components/Element';
import type { Element as IElement } from '../types/Element.interface';

interface HelixProps {
    elements: IElement[];
}

const Helix: FC<HelixProps> = ({ elements }) => {
    const { camera } = useThree();

    const textures = useLoader(
        TextureLoader,
        Array.from(
            { length: elements.length },
            (_, i) => `/textures/textures_elements_${i}.png`,
        ),
    );

    camera.position.set(0, 0, -15);

    const helixElements = useMemo(() => {
        const result: JSX.Element[] = [];

        for (let i = 0; i < elements.length; i++) {
            const theta = i * 0.175 + Math.PI;
            const y = -(i * 0.05) + 2;
            result.push(
                <Element
                    key={i}
                    position={new Vector3().setFromCylindricalCoords(
                        8,
                        theta,
                        y,
                    )}
                    texture={textures[+elements[i].atomicNumber - 1]}
                    index={i}
                />,
            );
        }
        return result;
    }, [elements, textures]);

    return <>{helixElements}</>;
};

export default Helix;

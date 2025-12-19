import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function SolidState() {
    const solidCube = useRef<Mesh>(null!);

    useFrame((state) => {
        const { clock } = state;

        solidCube.current.rotation.x = clock.elapsedTime * 0.01;
        solidCube.current.rotation.y = clock.elapsedTime * 0.02;
        solidCube.current.rotation.z = clock.elapsedTime * 0.01;
    });

    return (
        <mesh ref={solidCube}>
            <dodecahedronGeometry args={[3, 0]} />
            <meshStandardMaterial />
        </mesh>
    );
};

export default SolidState;

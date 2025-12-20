import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

import fragment from '@/shaders/liquid/fragment.glsl?raw';
import vertex from '@/shaders/liquid/vertex.glsl?raw';

export function LiquidState() {
    const liquidSphere = useRef<Mesh>(null!);

    useFrame((state) => {
        const { clock } = state;

        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        // TODO Fix linting error
        // @ts-expect-error shaderMaterial not recognized by tsc
        liquidSphere.current.material.uniforms.uTime.value = clock.elapsedTime;
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    });

    return (
        <mesh ref={liquidSphere}>
            <sphereGeometry args={[3, 128, 128]} />
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={{
                    uMouseDentro: { value: false },
                    uTime: { value: 0 },
                    uColor: { value: new Color(0x000000) },
                    uColor1: { value: new Color(0xf8f8f8) },
                }}
                transparent={true}
            />
        </mesh>
    );
}

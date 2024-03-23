import { useFrame } from '@react-three/fiber';
import { useRef, FC } from 'react';
import { Mesh, Color } from 'three';
import vertex from '@/shaders/liquid/vertex.glsl';
import fragment from '@/shaders/liquid/fragment.glsl';

interface LiquidStateProps {}

const LiquidState: FC<LiquidStateProps> = () => {
    const liquidSphere = useRef<Mesh>(null!);

    useFrame((state) => {
        const { clock } = state;

        // @ts-expect-error shaderMaterial not recognized by tsc
        liquidSphere.current.material.uniforms.uTime.value = clock.elapsedTime;
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
};

export default LiquidState;

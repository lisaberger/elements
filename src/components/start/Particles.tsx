import { FC, useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import { AdditiveBlending, type Points as IPoints, TextureLoader } from 'three';

// Help
// https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/

interface ParticlesProps {
    count: number;
}

const Particles: FC<ParticlesProps> = ({ count }) => {
    const points = useRef<IPoints>(null!);

    // Create random initital particle positions
    const particlePositions = useMemo(() => {
        // Create a Float32Array of count*3 length
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Generate random values for x, y, and z on every loop
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20 - 10;
            const z = Math.random() * 20 - 10;

            // Add the 3 values to the attribute array for every loop
            positions.set([x, y, z], i * 3);
        }

        return positions;
    }, [count]);

    // Load particle texture
    const texture = useLoader(TextureLoader, 'particle.png');

    useFrame((state) => {
        const { clock } = state;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            points.current.geometry.attributes.position.array[i3] +=
                Math.sin(clock.elapsedTime + Math.random() * 1) * 0.001;
            points.current.geometry.attributes.position.array[i3 + 1] +=
                Math.cos(clock.elapsedTime + Math.random() * 1) * 0.001;
            points.current.geometry.attributes.position.array[i3 + 2] +=
                Math.sin(clock.elapsedTime + Math.random() * 1) * 0.001;
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={points} positions={particlePositions}>
            <pointsMaterial
                size={0.1}
                color={0x816cff}
                map={texture}
                blending={AdditiveBlending}
                transparent
                alphaMap={texture}
                alphaTest={0.001}
            />
        </Points>
    );
};

export default Particles;

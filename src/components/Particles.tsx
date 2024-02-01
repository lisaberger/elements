import { FC, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
    mouseX: number;
    mouseY: number;
}

const Particles: FC<ParticlesProps> = ({ mouseX, mouseY }) => {
    const mesh = useRef();
    const vertices = [];
    const materials = [];

    let particles;

    const parameters = [
        [[1.0, 0.2, 0.5], 0.05],
        [[0.95, 0.1, 0.5], 0.3],
        [[0.9, 0.05, 0.5], 0.2],
        [[0.85, 0, 0.5], 0.3],
        [[0.8, 0, 0.5], 0.1],
    ];

    /**
     * Create random initital partical positions
     */
    for (let i = 0; i < 1100; i++) {
        const x = Math.random() * 20 - 10;
        const y = Math.random() * 20 - 10;
        const z = Math.random() * 20 - 10;
        vertices.push(x, y, z);
    }

    /**
     * Load particle texture
     */
    const texture = useLoader(THREE.TextureLoader, 'particle.png');

    /**
     * Create new particle cloud (geometry)
     */
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3),
    );

    for (let i = 0; i < parameters.length; i++) {
        const size = parameters[i][1];

        materials[i] = new THREE.PointsMaterial({
            size: size,
            color: 0x816cff,
            map: texture,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            alphaMap: texture,
            alphaTest: 0.001,
            depthTest: false,
        });

        particles = new THREE.Points(geometry, materials[i]);
        particles.rotation.x = Math.random() * 3;
        particles.rotation.y = Math.random() * 3;
        particles.rotation.z = Math.random() * 3;
    }

    // const clock = new THREE.Clock();

    useFrame((state, delta) => {
        // const elapsedTime = clock.getElapsedTime();

        if (mesh.current) {
            mesh.current.position.x +=
                (mouseX - mesh.current.position.x) * 0.000008;
            mesh.current.position.y +=
                (-mouseY - mesh.current.position.y) * 0.000008;

            // Loop through the children of the mesh and update particles
            mesh.current.children.forEach((object, index) => {
                if (object instanceof THREE.Points) {
                    object.rotation.y =
                        delta * (index < 4 ? index + 1 : -(index + 1)) * 0.003;
                }
            });
        }
    });

    return <primitive ref={mesh} object={particles} />;
};

export default Particles;

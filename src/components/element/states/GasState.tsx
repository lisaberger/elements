import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import {
    Color,
    Data3DTexture,
    FrontSide,
    GLSL3,
    LinearFilter,
    Mesh,
    RawShaderMaterial,
    RedFormat,
    Vector3,
} from 'three';
import { ImprovedNoise } from 'three/examples/jsm/Addons.js';

import fragment from '@/shaders/gas/fragment.glsl?raw';
import vertex from '@/shaders/gas/vertex.glsl?raw';

export function GasState() {
    const gasSphere = useRef<Mesh>(null!);
    const gasMaterial = useRef<RawShaderMaterial>(null!);

    // 3D-Texture
    const size = 128;
    const data = new Uint8Array(size * size * size);

    let i = 0;
    const scale = 0.05;
    const perlin = new ImprovedNoise();
    const vector = new Vector3();

    for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const d =
                    1.0 -
                    vector
                        .set(x, y, z)
                        .subScalar(size / 2)
                        .divideScalar(size)
                        .length();
                data[i] =
                    (128 + 128 * perlin.noise((x * scale) / 1.5, y * scale, (z * scale) / 1.5)) *
                    d *
                    d;
                i++;
            }
        }
    }

    const gasTexture = new Data3DTexture(data, size, size, size);
    gasTexture.format = RedFormat;
    gasTexture.minFilter = LinearFilter;
    gasTexture.magFilter = LinearFilter;
    gasTexture.unpackAlignment = 1;
    gasTexture.needsUpdate = true;

    /* eslint-disable react-hooks/refs */
    if (gasSphere.current) {
        gasSphere.current.scale.set(5, 5, 5);
    }
    /* eslint-enable react-hooks/refs */

    useFrame((state) => {
        const { camera } = state;

        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        // TODO Fix linting error
        // @ts-expect-error shaderMaterial not recognized by tsc
        gasSphere.current.material.uniforms.cameraPos.value = camera.position;
        gasSphere.current.rotation.y = -performance.now() / 7500;

        // @ts-expect-error shaderMaterial not recognized by tsc
        gasSphere.current.material.uniforms.frame.value++;
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    });

    return (
        <mesh ref={gasSphere}>
            <boxGeometry />
            <rawShaderMaterial
                ref={gasMaterial}
                glslVersion={GLSL3}
                uniforms={{
                    base: { value: new Color(0xffffff) },
                    map: { value: gasTexture },
                    cameraPos: { value: new Vector3() },
                    threshold: { value: 0.25 },
                    opacity: { value: 0.25 },
                    range: { value: 0.1 },
                    steps: { value: 100 },
                    frame: { value: 0 },
                }}
                vertexShader={vertex}
                fragmentShader={fragment}
                side={FrontSide}
                transparent
            />
        </mesh>
    );
}

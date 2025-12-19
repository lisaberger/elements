import { Suspense, useMemo, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { BallCollider, Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { Mesh, Vector3, MathUtils, Color } from 'three';

interface AtomeCoreProps {
    nucleusNumber: number;
}

function AtomCore({ nucleusNumber }: AtomeCoreProps) {
    return (
        <Suspense>
            <Physics timeStep="vary" gravity={[0, 0, 0]}>
                {Array.from({ length: nucleusNumber }, (_, i) => (
                    <AtomCoreElement
                        key={i}
                        color={i % 2 === 0 ? new Color(0x816cff) : new Color(0xe1beff)}
                    />
                ))}
            </Physics>
        </Suspense>
    );
}

interface AtomCoreElementProps {
    position?: Vector3;
    vec?: Vector3;
    r?: (spread: number) => number;
    color: Color;
}

function AtomCoreElement({
    position,
    vec = new Vector3(),
    r = MathUtils.randFloatSpread,
    color,
    ...props
}: AtomCoreElementProps) {
    const rigidBody = useRef<RapierRigidBody>(null);
    const mesh = useRef<Mesh>(null);
    const pos = useMemo(() => position ?? new Vector3(r(10), r(10), r(10)), [position, r]);

    useFrame(() => {
        rigidBody.current?.applyImpulse(
            vec
                .copy(rigidBody.current.translation() as Vector3)
                .negate()
                .multiplyScalar(0.5),
            true,
        );
    });
    return (
        <RigidBody
            linearDamping={3}
            angularDamping={1}
            friction={0.1}
            position={pos}
            ref={rigidBody}
            colliders={false}
        >
            <BallCollider args={[1]} />

            <mesh ref={mesh} castShadow receiveShadow>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial color={color} {...props} />
            </mesh>
        </RigidBody>
    );
}

export default AtomCore;

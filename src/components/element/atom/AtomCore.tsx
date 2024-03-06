import { useFrame } from '@react-three/fiber';
import { FC, Suspense, useMemo, useRef } from 'react';
import {
    BallCollider,
    Physics,
    RapierRigidBody,
    RigidBody,
} from '@react-three/rapier';
import { Mesh, Vector3, MathUtils } from 'three';

interface AtomeCoreProps {
    nucleusNumber: number;
}

const AtomCore: FC<AtomeCoreProps> = ({ nucleusNumber }) => {
    return (
        <Suspense>
            <Physics timeStep="vary" gravity={[0, 0, 0]}>
                {Array.from({ length: nucleusNumber }, (_, i) => (
                    <AtomCoreElement
                        key={i}
                        color={i % 2 === 0 ? 0x816cff : 0xe1beff}
                    />
                ))}
            </Physics>
        </Suspense>
    );
};

const AtomCoreElement: FC = ({
    position,
    vec = new Vector3(),
    scale,
    r = MathUtils.randFloatSpread,
    color,
    ...props
}) => {
    const rigidBody = useRef<RapierRigidBody>(null);
    const mesh = useRef<Mesh>(null);
    const pos = useMemo(() => position || [r(10), r(10), r(10)], []);

    useFrame(() => {
        rigidBody.current?.applyImpulse(
            vec
                .copy(rigidBody.current.translation())
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
};

export default AtomCore;

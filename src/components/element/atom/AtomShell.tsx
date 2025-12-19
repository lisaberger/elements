import { useRef, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';
import { DoubleSide, Group, Euler } from 'three';

interface AtomShellProps {
    electronDistribution: number[];
    baseRotationSpeed?: number;
    electronSpeed?: number;
    paused?: boolean;
}

function AtomShell({
    electronDistribution,
    baseRotationSpeed = 0.01,
    electronSpeed = 0.02,
    paused = false,
}: AtomShellProps) {
    const shellGroups = useRef<Group[]>([]);

    const shellTilts = useMemo(
        () =>
            electronDistribution.map(
                () =>
                    new Euler(
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                    ),
            ),
        [electronDistribution],
    );

    const electronAngles = useMemo(
        () =>
            electronDistribution.map((count) =>
                Array.from({ length: count }, () => Math.random() * 2 * Math.PI),
            ),
        [electronDistribution],
    );

    useFrame(() => {
        if (paused) return;

        shellGroups.current.forEach((shellGroup, shellIndex) => {
            if (!shellGroup) return;

            const shellRotationSpeed =
                baseRotationSpeed * (0.5 + shellIndex / electronDistribution.length);

            shellGroup.rotation.y += shellRotationSpeed;
            shellGroup.rotation.x += shellRotationSpeed / 2;

            shellGroup.children.forEach((child, electronIndex) => {
                if (child.type === 'Mesh' && electronIndex > 0) {
                    const radius = child.position.length();

                    electronAngles[shellIndex][electronIndex - 1] += electronSpeed; // Update Winkel

                    const angle = electronAngles[shellIndex][electronIndex - 1];

                    child.position.x = radius * Math.cos(angle);
                    child.position.y = radius * Math.sin(angle);
                }
            });
        });
    });

    const radius = 15;
    const distance = 10;

    return (
        <group>
            {electronDistribution.map((shellElectronCount, shellIndex) => {
                const shellRadius = radius + shellIndex * distance;

                const shellMesh = (
                    <mesh key={`shell_${shellIndex}`}>
                        <ringGeometry args={[shellRadius, shellRadius + 0.1, 80]} />
                        <meshBasicMaterial color={0x816cff} side={DoubleSide} />
                    </mesh>
                );

                const electrons = Array.from({ length: shellElectronCount }).map(
                    (_, electronIndex) => {
                        const angle = electronAngles[shellIndex][electronIndex];
                        const x = shellRadius * Math.cos(angle);
                        const y = shellRadius * Math.sin(angle);

                        return (
                            <mesh
                                key={`electron_${shellIndex}_${electronIndex}`}
                                position={[x, y, 0]}
                            >
                                <sphereGeometry args={[1, 32, 16]} />
                                <meshStandardMaterial color={0xffffff} />
                            </mesh>
                        );
                    },
                );

                return (
                    <group
                        key={`shell_group_${shellIndex}`}
                        ref={(el) => (shellGroups.current[shellIndex] = el!)}
                        rotation={shellTilts[shellIndex]}
                    >
                        {shellMesh}
                        {electrons}
                    </group>
                );
            })}
        </group>
    );
}

export default AtomShell;

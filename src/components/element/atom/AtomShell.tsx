import { FC } from 'react';
import { DoubleSide } from 'three';

interface AtomShellProps {
    electronDistribution: Array<number>;
}

const AtomShell: FC<AtomShellProps> = ({ electronDistribution }) => {
    const radius = 15;
    const distance = 10;

    return (
        <group>
            {electronDistribution.map((shellElectronCount, shellIndex) => {
                // Create shells
                const shellRadius = radius + shellIndex * distance;

                const shells = (
                    <mesh key={`shell_${shellIndex}`}>
                        <ringGeometry
                            args={[shellRadius, shellRadius + 0.1, 80]}
                        />
                        <meshBasicMaterial color={0x816cff} side={DoubleSide} />
                    </mesh>
                );

                // Create and place electrons on shells
                const electrons = Array.from({
                    length: shellElectronCount,
                }).map((_, electronIndex) => {
                    const angle =
                        (electronIndex / shellElectronCount) * 2 * Math.PI;
                    const xPos = shellRadius * Math.cos(angle);
                    const yPos = shellRadius * Math.sin(angle);

                    return (
                        <mesh
                            key={`electron_${shellIndex}_${electronIndex}`}
                            position={[xPos, yPos, 0]}
                        >
                            <sphereGeometry args={[1, 50, 16]} />
                            <meshStandardMaterial color={0xffffff} />
                        </mesh>
                    );
                });

                return (
                    <group key={`shell_group_${shellIndex}`}>
                        {shells}
                        {electrons}
                    </group>
                );
            })}
        </group>
    );
};

export default AtomShell;

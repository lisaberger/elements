import { FC, useRef } from 'react';
import * as THREE from 'three';

/**
 * Adds electron shells to the 3D representation of an atom.
 * Shells are created based on the atom's electron distribution.
 */

interface AtomShellProps {
    electronDistribution: Array<number>;
}

const AtomShell: FC<AtomShellProps> = ({ electronDistribution }) => {
    const shellRef = useRef<THREE.Group>();

    const pivot = new THREE.Object3D();
    if (shellRef.current) {
        shellRef.current.add(pivot);
    }

    let xPos = 0;
    let yPos = 0;
    let radius = 1500;
    const distance = 1000;

    for (let s = 0; s < electronDistribution.length; s++) {
        for (let n = 0; n < electronDistribution[s]; n++) {
            xPos =
                radius * Math.cos((n / electronDistribution[s]) * 2 * Math.PI);
            yPos =
                radius * Math.sin((n / electronDistribution[s]) * 2 * Math.PI);

            const electronGeometry = new THREE.SphereGeometry(80, 50, 16);
            const electronMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
            });

            const shellGeometry = new THREE.RingGeometry(
                radius,
                radius + 10,
                80,
            );
            const shellMaterial = new THREE.MeshBasicMaterial({
                color: 0x816cff,
                side: THREE.DoubleSide,
            });
            const shell = new THREE.Mesh(shellGeometry, shellMaterial);
            if (shellRef.current) {
                shellRef.current.add(shell);
            }

            const electron = new THREE.Mesh(electronGeometry, electronMaterial);

            pivot.add(electron);

            electron.position.set(xPos, yPos, 0);

            if (shellRef.current) {
                shellRef.current.add(electron);
            }
        }
        radius += distance;
    }

    return <group ref={shellRef} />;
};

export default AtomShell;

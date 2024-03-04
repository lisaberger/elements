import { useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { collide } from '../../utils/collide';
import { getSpherePackPositions } from '../../utils/getSpherePackPositions';

interface AtomeCoreProps {
    nucleusNumber: number;
}

const AtomCore: FC<AtomeCoreProps> = ({ nucleusNumber }) => {
    const { gl } = useThree();

    const coreRef = useRef();
    const nodesRef = useRef();

    const addSpheres = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
            const SphereGeometry = new THREE.SphereGeometry(
                nodes[i].radius,
                20,
                20,
            );

            let sphereMaterial;

            if (i % 2 === 0) {
                sphereMaterial = new THREE.MeshBasicMaterial({
                    color: 0x816cff, // Protons
                });
            } else {
                sphereMaterial = new THREE.MeshBasicMaterial({
                    color: 0xe1beff, // Neutrons
                });
            }

            const sphere = new THREE.Mesh(SphereGeometry, sphereMaterial);
            sphere.position.set(nodes[i].x, nodes[i].y, nodes[i].z);
            coreRef.current.add(sphere);
        }
    };

    const updateSpheres = (nodes) => {
        // Position
        let q = d3.geom.octree(nodes);

        for (let i = 1; i < nodes.length; ++i) {
            q.visit(collide(nodes[i]));

            // Update the position based on the structure of your node object
            nodesRef.current[i].x = nodes[i].x - 300;
            nodesRef.current[i].y = nodes[i].y - 200;
            nodesRef.current[i].z = nodes[i].z;
        }
    };

    useEffect(() => {
        const nodes = getSpherePackPositions(gl, nucleusNumber);
        console.log('nodes', nodes);

        if (coreRef.current) {
            addSpheres(nodes); // Call the function to add spheres

            // Memoize nodes
            nodesRef.current = nodes;
        }
    }, [gl, nucleusNumber]);

    // Use the useFrame hook for animation updates
    useFrame(() => {
        // Access nodes from the useRef
        const nodes = nodesRef.current;

        if (nodes) {
            updateSpheres(nodes);
        }
    });

    return <group ref={coreRef} />;
};

export default AtomCore;

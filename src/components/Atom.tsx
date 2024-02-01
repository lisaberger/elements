import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
// import * as d3 from 'd3';
import { Element } from '../types/Element.interface';
import { determineAtomConfiguration } from '../utils/determineAtomConfiguration';
import { getSpherePackPositions } from '../utils/getSpherePackPositions';
import { collide } from '../utils/collide';

interface AtomProps {
    element: Element;
}

const Atom: FC<AtomProps> = ({ element }) => {
    const { scene, gl } = useThree();

    console.log('scene', scene, 'gl', gl);

    const shellRef = useRef();
    const coreRef = useRef();
    const nodesRef = useRef([]);

    // get the atomic number of the element
    const atomicNumber = Number(element?.atomicNumber);

    // // // total number of electrons
    const numElectrons = Number(element?.atomicNumber);

    // // // total number of neutrons / protons
    let nucleusNumber: number;

    if (atomicNumber === 1) {
        nucleusNumber = 2;
    } else {
        nucleusNumber = 2 * numElectrons + 1;
    }

    console.log('core', coreRef.current);
    console.log('shell', shellRef.current);

    /**
     * Adds electron shells to the 3D representation of an atom.
     * Shells are created based on the atom's electron distribution.
     */
    const addShells = () => {
        const pivot = new THREE.Object3D();
        shellRef.current.add(pivot);

        const atomVerteilung = determineAtomConfiguration(element);

        let xPos = 0;
        let yPos = 0;
        let radius = 1500;
        const distance = 1000;

        for (let s = 0; s < atomVerteilung.length; s++) {
            for (let n = 0; n < atomVerteilung[s]; n++) {
                xPos = radius * Math.cos((n / atomVerteilung[s]) * 2 * Math.PI);
                yPos = radius * Math.sin((n / atomVerteilung[s]) * 2 * Math.PI);

                const electronGeometry = new THREE.SphereGeometry(80, 50, 16);
                const electronMaterial = new THREE.MeshLambertMaterial({
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
                shellRef.current.add(shell);

                const electron = new THREE.Mesh(
                    electronGeometry,
                    electronMaterial,
                );
                pivot.add(electron);

                electron.position.set(xPos, yPos, 0);

                shellRef.current.add(electron);
            }
            radius += distance;
        }
    };

    const addSpheres = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
            const SphereGeometry = new THREE.SphereGeometry(
                nodes[i].radius,
                20,
                20,
            );

            let sphereMaterial;

            if (i % 2 === 0) {
                sphereMaterial = new THREE.MeshLambertMaterial({
                    color: 0x816cff, // Protons
                });
            } else {
                sphereMaterial = new THREE.MeshLambertMaterial({
                    color: 0xe1beff, // Neutrons
                });
            }

            const sphere = new THREE.Mesh(SphereGeometry, sphereMaterial);
            sphere.position.set(nodes[i].x, nodes[i].y, nodes[i].z);
            coreRef.current.add(sphere);
        }
    };

    const addLights = () => {
        const directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
        directionalLight.position.set(100, 100, -100);
        scene.add(directionalLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.25);
        hemiLight.position.y = 5100;
        scene.add(hemiLight);
    };

    const updateSpheres = (nodes) => {
        // Position
        let q = d3.geom.octree(nodes);

        console.log('update spheres:', nodes);

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

        if (element && coreRef.current && shellRef.current) {
            addShells(); // Call the function to add shells
            addSpheres(nodes); // Call the function to add spheres
            addLights();

            // Memoize nodes
            nodesRef.current = nodes;
        }
    }, [element]);

    // Use the useFrame hook for animation updates
    useFrame(() => {
        // Access nodes from the useRef
        const nodes = nodesRef.current;

        if (nodes) {
            updateSpheres(nodes);
        }
    });

    return (
        <>
            <group ref={coreRef} />
            <group ref={shellRef} />
        </>
    );
};

interface AtomViewProps {
    element: Element;
}

const AtomView: FC<AtomViewProps> = ({ element }) => {
    return (
        <Canvas
            style={{ position: 'absolute' }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100000,
                position: [50, -100, 10000],
            }}
        >
            <Atom element={element} />
            <OrbitControls />
        </Canvas>
    );
};

export default AtomView;

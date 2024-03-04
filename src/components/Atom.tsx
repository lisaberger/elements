import { useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
// import * as d3 from 'd3';
import type { Element } from '../types/Element.interface';
import { determineAtomConfiguration } from '../utils/determineAtomConfiguration';
import { getSpherePackPositions } from '../utils/getSpherePackPositions';
import { collide } from '../utils/collide';
import AtomShell from './AtomShell';

interface AtomProps {
    element: Element;
}

const Atom: FC<AtomProps> = ({ element }) => {
    const { gl } = useThree();

    const shellRef = useRef();
    const coreRef = useRef();
    const nodesRef = useRef([]);

    // get the atomic number of the element
    const atomicNumber = Number(element?.atomicNumber);

    // total number of electrons
    const numElectrons = Number(element?.atomicNumber);

    // total number of neutrons / protons
    let nucleusNumber: number;

    if (atomicNumber === 1) {
        nucleusNumber = 2;
    } else {
        nucleusNumber = 2 * numElectrons + 1;
    }

    /**
     * Adds electron shells to the 3D representation of an atom.
     * Shells are created based on the atom's electron distribution.
     */
    const atomVerteilung = determineAtomConfiguration(element);

    const updateSpheres = (nodes) => {
        // Position
        let q = d3.geom.octree(nodes);

        // console.log('update spheres:', nodes);

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
            addSpheres(nodes); // Call the function to add spheres

            // Memoize nodes
            nodesRef.current = nodes;
        }
    }, [element, gl, nucleusNumber]);

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
            <AtomShell electronDistribution={atomVerteilung} />
        </>
    );
};
export default Atom;

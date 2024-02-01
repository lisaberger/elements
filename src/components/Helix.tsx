import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import Element from './Element';

interface HelixProps {
    elements: Element[];
}

// const Helix: FC<HelixProps> = ({ elements }) => {
//     const { scene, camera } = useThree();

//     // TEXTURES
//     const textures = useLoader(
//         THREE.TextureLoader,
//         Array.from(
//             { length: 118 },
//             (_, i) => `/textures/textures_elements_${i}.png`,
//         ),
//     );

//     //GEOMETRY
//     const vector = new THREE.Vector3();
//     const geometryBox = new RoundedBoxGeometry(1, 1, 1, 10, 0.1);

//     useEffect(() => {
//         const newHelix: THREE.Mesh[] = [];

//         for (let i = 0; i < elements.length; i++) {
//             const theta = i * 0.175 + Math.PI; //default  0.175
//             const y = -(i * 0.05) + 2;

//             // generate new object and assign texture
//             const object = new THREE.Mesh(
//                 geometryBox,
//                 new THREE.MeshBasicMaterial({
//                     map: textures[i],
//                 }),
//             );

//             object.position.setFromCylindricalCoords(8, theta, y);
//             vector.x = object.position.x * 2;
//             vector.y = object.position.y;
//             vector.z = object.position.z * 2;

//             // assign name for redirection id
//             object.name = i.toString();

//             // set direction of the object
//             object.lookAt(vector);

//             newHelix.push(object);
//         }

//         // // add cubes to scene
//         newHelix.forEach((object) => scene.add(object));

//         // set the camera after creating the helix
//         camera.position.set(0, 0, -15);
//     }, [elements, scene, camera, textures, geometryBox, vector]);

// useFrame(({ state, delay, mouse }) => {
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     const objectsToTest = helix;
//     const intersects = raycaster.intersectObjects(objectsToTest);

//     for (const object of objectsToTest) {
//         object.material.color.set('#FFF');
//     }

//     if (intersects.length > 0) {
//         intersects[0].object.material.color.set('#CBC3FF');
//     }
// });

//     return null;
// };

const Helix: FC<HelixProps> = ({ elements }) => {
    const { scene, camera } = useThree();
    const textures = useLoader(
        THREE.TextureLoader,
        Array.from(
            { length: 118 },
            (_, i) => `/textures/textures_elements_${i}.png`,
        ),
    );

    camera.position.set(0, 0, -15);

    const helixElements = useMemo(() => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < elements.length; i++) {
            const theta = i * 0.175 + Math.PI;
            const y = -(i * 0.05) + 2;
            result.push(
                <Element
                    key={i}
                    position={new THREE.Vector3().setFromCylindricalCoords(
                        8,
                        theta,
                        y,
                    )}
                    texture={textures[i]}
                    index={i}
                />,
            );
        }
        return result;
    }, [elements, textures]);

    return <>{helixElements}</>;
};

export default Helix;

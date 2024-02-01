import { RoundedBox } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';

// const Element = ({ texture, position }) => {
//     const [boxColor, setboxColor] = useState('#FFF');

//     const changeBoxColor = () => {
//         setboxColor('#CBC3FF');
//     };

//     return (
//         <RoundedBox
//             args={[1, 1, 1]}
//             smoothness={10}
//             radius={0.1}
//             onPointerEnter={changeBoxColor}
//             position={position}
//         >
//             <meshBasicMaterial map={texture} color={boxColor} />
//         </RoundedBox>
//     );
// };

const Element: FC<{
    position: THREE.Vector3;
    texture: THREE.Texture;
    index: number;
}> = ({ position, texture, index }) => {
    const [hovered, setHovered] = useState(false);
    const vector = new THREE.Vector3();
    const geometryBox = new RoundedBoxGeometry(1, 1, 1, 10, 0.1);

    const object = useMemo(() => {
        const newObj = new THREE.Mesh(
            geometryBox,
            new THREE.MeshBasicMaterial({
                map: texture,
                color: hovered ? '#CBC3FF' : '#FFF',
            }),
        );

        newObj.position.copy(position);
        vector.x = newObj.position.x * 2;
        vector.y = newObj.position.y;
        vector.z = newObj.position.z * 2;

        newObj.lookAt(vector);
        newObj.name = index + 1;

        return newObj;
    }, [geometryBox, hovered, index, position, texture, vector]);

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/element/${index + 1}`);
    };

    return (
        <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onDoubleClick={onClickHandler}
        >
            <primitive object={object} />
        </mesh>
    );
};

export default Element;

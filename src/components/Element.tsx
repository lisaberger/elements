import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vector3, Texture } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';

interface ElementProps {
    position: Vector3;
    texture: Texture;
    index: number;
}

const Element: FC<ElementProps> = ({ position, texture, index }) => {
    const [hovered, setHovered] = useState(false);
    const boxRef = useRef();
    const vector = useMemo(() => new Vector3(), []);

    const boxColor = hovered ? '#CBC3FF' : '#FFF';

    useEffect(() => {
        vector.set(position.x * 2, position.y, position.z * 2);

        if (boxRef.current) {
            boxRef.current.lookAt(vector);
        }
    }, [position, vector]);

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/element/${index + 1}`);
    };

    const geometryBox = new RoundedBoxGeometry(1, 1, 1, 10, 0.1);

    return (
        <mesh
            ref={boxRef}
            geometry={geometryBox}
            name={(index + 1).toString()}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onDoubleClick={onClickHandler}
        >
            <meshBasicMaterial
                toneMapped={false}
                color={boxColor}
                map={texture}
            />
        </mesh>

        // TODO: Find way to use roundedBox (texture mapping issue)
        //         <RoundedBox
        //             ref={boxRef}
        //             name={(index + 1).toString()}
        //             position={position}
        //             args={[1, 1, 1]}
        //             radius={0.1}
        //             onPointerOver={() => setHovered(true)}
        //             onPointerOut={() => setHovered(false)}
        //             onDoubleClick={onClickHandler}
        //         >
        //             <meshBasicMaterial
        //                 toneMapped={false}
        //                 color={boxColor}
        //                 map={texture}
        //             />
        //         </RoundedBox>
    );
};

export default Element;

import { Canvas, useFrame } from '@react-three/fiber';
import styles from './HomePage.module.scss';
import Particles from '@/components/Particles';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [pointerPosition, setPointerPosition] = useState({
        mouseX: 0,
        mouseY: 0,
    });

    const navigate = useNavigate();

    const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleAppStart = () => {
        navigate('/all');
    };

    document.body.addEventListener('pointermove', onPointerMove);

    function onPointerMove(event) {
        if (event.isPrimary === false) return;
        updatePointerPosition(event);
    }

    const updatePointerPosition = (event: PointerEvent<HTMLDivElement>) => {
        setPointerPosition({
            mouseX: event.clientX - size.width / 2,
            mouseY: event.clientY - size.height / 2,
        });
    };

    return (
        <>
            <Canvas {...size} style={{ position: 'absolute' }}>
                <Particles
                    mouseX={pointerPosition.mouseX}
                    mouseY={pointerPosition.mouseY}
                />
                <OrbitControls />
            </Canvas>
            <section className={styles.section}>
                <img
                    src="/elements-rgb-wort-bild.svg"
                    className={styles.logo}
                />
                <p>
                    Get to know all the chemical elements from a new perspective
                    with this interactive 3D application. We break the rigid
                    structure of the periodic table to present the important
                    properties in new ways using the 3D space.
                </p>
                <button id={styles.starter} onClick={handleAppStart}>
                    Start
                </button>
            </section>
        </>
    );
};

export default HomePage;

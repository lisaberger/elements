import { useEffect, useState } from 'react';
import { fetchElementByAtomicNumber } from '../utils/fetchElements';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import type { Element } from '@/types/Element.interface';
import Atom from '@/components/element/Atom';
import Logo from '@/components/shared/Logo';
import Info from '@/components/element/Info';
import Icon from '@/components/shared/Icon';
import styles from './ElementPage.module.scss';

const ElementPage = () => {
    const { id } = useParams();
    const [element, setElement] = useState<null | Element>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchElementData = async () => {
            try {
                const loadedElement = await fetchElementByAtomicNumber(
                    Number(id),
                );

                setElement(loadedElement);
            } catch (error) {
                // Hier können Sie Fehlerbehandlungslogik hinzufügen
                console.error('Error in useEffect:', error.message);
            }
        };

        fetchElementData();
    }, [id]);

    const returnHandler = () => {
        navigate('/all');
    };

    const onArrowClickHandler = (direction: string) => {
        if (direction === 'left') {
            navigate(`/element/${Number(id) - 1}`);
        } else {
            navigate(`/element/${Number(id) + 1}`);
        }
    };

    return (
        <>
            <main className="h-full flex z-2">
                <section className="w-9 relative">
                    <div className="p-4 absolute z-4 flex w-full align-items-center justify-content-between">
                        <Logo size="medium" onClick={returnHandler} />
                        <Icon icon="x" onClick={returnHandler} />
                    </div>

                    <div className="z-1">
                        <Canvas
                            style={{ position: 'absolute' }}
                            camera={{
                                fov: 45,
                                near: 0.1,
                                far: 100000,
                                position: [50, -100, 10000],
                            }}
                        >
                            {element && <Atom element={element} />}
                            <OrbitControls />
                            <directionalLight
                                position={[100, 100, -100]}
                                color={0xffffff}
                                intensity={0.5}
                            />
                            <hemisphereLight
                                position={[0, 5100, 0]}
                                color={0xffffff}
                                intensity={1.25}
                            />
                        </Canvas>
                        <span className="p-4 absolute z-4 top-50">
                            <Icon
                                icon="arrow-left"
                                onClick={() => onArrowClickHandler('left')}
                            />
                        </span>
                        <span className="right-0 top-50 p-4 absolute">
                            <Icon
                                icon="arrow-right"
                                onClick={() => onArrowClickHandler('right')}
                            />
                        </span>
                    </div>
                </section>

                <section className="w-3 bg-primary flex flex-column align-items-center justify-content-center">
                    <Info element={element} />
                </section>
            </main>
        </>
    );
};

export default ElementPage;

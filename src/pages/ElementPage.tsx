import { useState } from 'react';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import logo from '@/assets/logo/elements-rgb-wort-bild.svg';
import { Atom, ElementModal, Info, Icon, Logo } from '@/components';
import { IconName } from '@/icons';
import { RouteName } from '@/router';
import { useAppSelector, selectElementByAtomicNumber } from '@/store';

function ElementPage() {
    const { id } = useParams();
    const { t } = useTranslation();

    let atomicNumber = 1;

    const [paused, setPaused] = useState(false);
    const [showModal, setShowModal] = useState(false);

    if (id) {
        atomicNumber = +id;
    }

    const element = useAppSelector((state) => selectElementByAtomicNumber(state, atomicNumber));
    const navigate = useNavigate();

    const returnHandler = () => {
        void navigate(RouteName.Overview);
    };

    const onArrowClickHandler = (direction: string): void => {
        if (direction === 'left') {
            void navigate(generatePath(RouteName.Element, { id: `${Number(id) - 1}` }));
        } else {
            void navigate(generatePath(RouteName.Element, { id: `${Number(id) + 1}` }));
        }
    };

    return (
        <>
            <main className="h-full flex flex-col md:flex-row z-2">
                <section className="flex-3 relative">
                    <div className="p-4 md:px-8 absolute z-4 flex w-full items-center justify-between">
                        <Logo src={logo} onClick={returnHandler} />

                        <button onClick={returnHandler}>
                            <Icon name="x" />
                        </button>
                    </div>

                    <div className="z-1">
                        <Canvas
                            style={{ position: 'absolute' }}
                            camera={{
                                fov: 45,
                                near: 0.1,
                                far: 1000,
                                position: [0, 0, 100],
                            }}
                        >
                            {element && <Atom element={element} state={{ paused }} />}
                            <OrbitControls />
                            <hemisphereLight
                                position={[0, 0, 10]}
                                color={0xffffff}
                                intensity={2.25}
                            />
                        </Canvas>
                        <button
                            className="p-4 md:px-8  absolute z-4 top-1/2 cursor-hand"
                            onClick={() => onArrowClickHandler('left')}
                        >
                            <Icon name={IconName.ArrowLeft} />
                        </button>
                        <button
                            className="right-0 top-1/2 p-4 md:px-8 absolute cursor-hand"
                            onClick={() => onArrowClickHandler('right')}
                        >
                            <Icon name={IconName.ArrowRight} />
                        </button>
                    </div>
                    <button
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 p-2 bg-primary text-white rounded-lg z-5"
                        onClick={() => setPaused((prev) => !prev)}
                    >
                        {paused ? t('startAnimation') : t('stopAnimation')}
                        <Icon
                            name={paused ? IconName.Play : IconName.Stop}
                            className="inline-block ml-2"
                        />
                    </button>

                    {/* Open Modal Button */}
                    <button
                        className="absolute left-8 bottom-8 p-2 text-white rounded z-5 hover:cursor-hand"
                        onClick={() => setShowModal(true)}
                    >
                        Show Configuration
                    </button>
                </section>

                <section className="flex-1 bg-primary flex flex-col items-center justify-center">
                    <Info element={element} />
                </section>
            </main>
            {showModal && element && (
                <ElementModal element={element} onClose={() => setShowModal(false)} />
            )}
        </>
    );
}

export default ElementPage;

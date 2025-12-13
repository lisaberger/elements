import { useNavigate, useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Atom from '@/components/element/atom/Atom';
import Logo from '@/components/_ui/Logo';
import Info from '@/components/element/Info';
import Icon from '@/components/_ui/Icon';
import { useAppSelector } from '@/store/hooks';
import { selectElementByAtomicNumber } from '@/store/slices/elementsSlice';
import { IconName } from '@/icons';

const ElementPage = () => {
    const { id } = useParams();
    let atomicNumber = 1;

    if (id) {
        atomicNumber = +id;
    }

    const element = useAppSelector((state) =>
        selectElementByAtomicNumber(state, atomicNumber),
    );
    const navigate = useNavigate();

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
            <main className="h-full flex flex-col md:flex-row z-2">
                <section className="flex-3 relative">
                    <div className="p-4 absolute z-4 flex w-full items-center justify-between">
                        <Logo src="/logo/elements-rgb-wort-bild.svg" onClick={returnHandler} />
                        
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
                            {element && <Atom element={element} />}
                            <OrbitControls />
                            <hemisphereLight
                                position={[0, 0, 10]}
                                color={0xffffff}
                                intensity={2.25}
                            />
                        </Canvas>
                        <button className="p-4 absolute z-4 top-1/2 cursor-hand" onClick={() => onArrowClickHandler('left')}>
                            <Icon
                                name={IconName.ArrowLeft}
                            />
                        </button>
                        <button className="right-0 top-1/2 p-4 absolute cursor-hand" onClick={() => onArrowClickHandler('right')}>
                            <Icon
                                name={IconName.ArrowRight}
                            />
                        </button>
                    </div>
                </section>

                <section className="flex-1 bg-primary flex flex-col items-center justify-center">
                    <Info element={element} />
                </section>
            </main>
        </>
    );
};

export default ElementPage;

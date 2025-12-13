import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import Table from '@/containers/Table';
import Helix from '@/containers/Helix';
import Filters from '@/components/overview/Filters';
import Header from '@/components/overview/Header';
import Loader from '@/components/_ui/Loader';
import { useAppSelector } from '@/store/hooks';
import {
    getElementsError,
    getElementsStatus,
    searchedAndFilteredElements,
} from '@/store/slices/elementsSlice';
import { ViewType } from '@/types/View.interface';

const OverviewPage = () => {
    const [type, setType] = useState<ViewType>(ViewType.Helix);
    const elementsStatus = useAppSelector(getElementsStatus);
    const error = useAppSelector(getElementsError);

    const filteredElements = useAppSelector(searchedAndFilteredElements);

    return (
        <div>
            <Header type={type} onTypeChange={(eventType) => setType(eventType)} />
            <Filters />
            {elementsStatus === 'loading' && (
                <p className="text-primary m-auto">Load Elements...</p>
            )}

            {elementsStatus === 'failed' && <p>{error}</p>}

            {elementsStatus === 'succeeded' && (
                <Canvas style={{ position: 'absolute', zIndex: 1 }}>
                    <Suspense fallback={<Loader />}>
                        {type === 'Helix' && (
                            <Helix elements={filteredElements} />
                        )}
                        {type === 'Table' && (
                            <Table elements={filteredElements} />
                        )}
                        <OrbitControls
                            minPolarAngle={Math.PI / 2}
                            maxPolarAngle={Math.PI / 2}
                        />
                        <ambientLight color={0xcc9ff4} intensity={1} />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
};

export default OverviewPage;

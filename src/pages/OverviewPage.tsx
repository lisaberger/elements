import { Suspense, useState } from 'react';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Loader, Filters, Header } from '@/components';
import { Helix, Table } from '@/containers';
import {
    useAppSelector,
    getElementsError,
    getElementsStatus,
    searchedAndFilteredElements,
} from '@/store';
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
                        {type === ViewType.Helix && <Helix elements={filteredElements} />}
                        {type === ViewType.Table && <Table elements={filteredElements} />}
                        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
                        <ambientLight color={0xcc9ff4} intensity={1} />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
};

export default OverviewPage;

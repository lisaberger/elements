import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import Table from '@/components/overview/Table';
import Helix from '@/components/overview/Helix';
import Filters from '@/components/overview/filters/Filters';
import Header from '@/components/overview/Header';
import Loader from '@/components/ui/Loader';
import { useAppSelector } from '@/store/hooks';
import {
    getElementsError,
    getElementsStatus,
    filteredElements as filteredEl,
} from '@/store/slices/elementsSlice';

const OverviewPage = () => {
    const [type, setType] = useState<'Helix' | 'Table'>('Helix');
    const elementsStatus = useAppSelector(getElementsStatus);
    const error = useAppSelector(getElementsError);

    const filteredElements = useAppSelector(filteredEl);

    const handleTypeChange = (eventType: 'Helix' | 'Table') => {
        setType(eventType);
    };

    return (
        <div>
            <Header type={type} onTypeChange={handleTypeChange} />
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

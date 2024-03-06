import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import type { Element } from '@/types/Element.interface';
import Table from '@/components/overview/Table';
import Helix from '@/components/overview/Helix';
import Filters from '@/components/overview/filters/Filters';
import Header from '@/components/overview/Header';
import Loader from '@/components/shared/Loader';
import { useAppSelector } from '@/store/hooks';
import {
    selectAllElements,
    getElementsError,
    getElementsStatus,
} from '@/store/slices/elementsSlice';

const OverviewPage = () => {
    const [type, setType] = useState<'Helix' | 'Table'>('Helix');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filteredElements, setFilteredElements] = useState<Element[]>([]);

    const elements = useAppSelector(selectAllElements);
    const elementsStatus = useAppSelector(getElementsStatus);
    const error = useAppSelector(getElementsError);

    const handleTypeChange = (eventType: 'Helix' | 'Table') => {
        setType(eventType);
    };

    const handleFiltersChange = (filters) => {
        setSelectedFilters(filters);
    };

    useEffect(() => {
        if (elements.length > 0) {
            const filteredElements = elements.filter((element: Element) => {
                // Überprüfen, ob das Element den ausgewählten Filtern entspricht
                const matchesMainGroup =
                    !selectedFilters.groupBlock ||
                    element.groupBlock === selectedFilters.groupBlock;
                const matchesStandardStates =
                    !selectedFilters.standardState ||
                    element.standardState === selectedFilters.standardState;
                const matchesBondingType =
                    !selectedFilters.bondingType ||
                    element.bondingType === selectedFilters.bondingType;

                // Das Element wird beibehalten, wenn es allen ausgewählten Filtern entspricht
                return (
                    matchesMainGroup &&
                    matchesStandardStates &&
                    matchesBondingType
                );
            });

            setFilteredElements(filteredElements);
        }
    }, [elements, selectedFilters]);

    return (
        <div>
            <Header type={type} onTypeChange={handleTypeChange} />
            <Filters onFiltersChange={handleFiltersChange} />
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

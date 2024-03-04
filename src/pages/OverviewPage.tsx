import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { fetchElements } from '@/utils/fetchElements';
import { OrbitControls } from '@react-three/drei';
import type { Element } from '@/types/Element.interface';
import Table from '@/components/overview/Table';
import Helix from '@/components/overview/Helix';
import Filters from '@/components/overview/filters/Filters';
import Header from '@/components/overview/Header';

const OverviewPage = () => {
    const [elements, setElements] = useState<Element[]>([]);
    const [type, setType] = useState<'Helix' | 'Table'>('Helix');
    const [selectedFilters, setSelectedFilters] = useState({});

    const [filteredElements, setFilteredElements] = useState([]);

    useEffect(() => {
        const fetchElementsData = async () => {
            try {
                const loadedElements = await fetchElements();
                setElements(loadedElements);
            } catch (error) {
                console.error('Error in useEffect:', error.message);
            }
        };

        fetchElementsData();
    }, []);

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
            <Canvas style={{ position: 'absolute', zIndex: 1 }}>
                {type === 'Helix' && <Helix elements={filteredElements} />}
                {type === 'Table' && <Table elements={filteredElements} />}
                <OrbitControls
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
                <ambientLight color={0xcc9ff4} intensity={1} />
            </Canvas>
        </div>
    );
};

export default OverviewPage;

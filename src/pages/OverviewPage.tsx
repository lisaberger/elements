import { Canvas } from '@react-three/fiber';
import Helix from '@/components/Helix';
import Table from '@/components/Table';
import { useEffect, useState } from 'react';
import { fetchElements } from '../utils/fetchElements';
import { OrbitControls } from '@react-three/drei';

import Filters from '../components/Filters';
import Header from '../components/Header';

const OverviewPage = () => {
    const [elements, setElements] = useState<null | []>([]);
    const [type, setType] = useState<'Helix' | 'Table'>('Helix');

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

    return (
        <div>
            <Header type={type} onTypeChange={handleTypeChange} />
            <Filters />
            <Canvas style={{ position: 'absolute', zIndex: 1 }}>
                {type === 'Helix' && <Helix elements={elements} />}
                {type === 'Table' && <Table elements={elements} />}
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

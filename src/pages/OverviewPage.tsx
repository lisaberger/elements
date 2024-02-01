import { Canvas } from '@react-three/fiber';
import Helix from '@/components/Helix';
import { useEffect, useState } from 'react';
import { fetchElements } from '../utils/fetchElements';

import styles from './OverviewPage.module.scss';
import { OrbitControls } from '@react-three/drei';

const OverviewPage = () => {
    const [elements, setElements] = useState<null | []>([]);

    useEffect(() => {
        const fetchElementsData = async () => {
            try {
                const loadedElements = await fetchElements();
                setElements(loadedElements);
            } catch (error) {
                // Hier können Sie Fehlerbehandlungslogik hinzufügen
                console.error('Error in useEffect:', error.message);
            }
        };

        fetchElementsData();
    }, []);

    return (
        <>
            <Canvas style={{ position: 'absolute' }}>
                <Helix elements={elements} />
                <OrbitControls
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
            <img className={styles.logo} src="/elements-rgb-wort-bild.svg" />
            <div className="toggle">
                <label className="switch">
                    <input className="btn" type="checkbox" />
                    <span className="slider round" />
                </label>
            </div>
            <div className="state">
                <h4>Helix</h4>
            </div>
            <div className="filter">
                <select
                    name="maingroups"
                    id="maingroups"
                    className="filters mg1"
                >
                    <option value="default" selected>
                        Maingroup
                    </option>
                    <option value="nonmetal">Nonmetals</option>
                    <option value="noble gas">Noble Gasses</option>
                    <option value="alkali metal">Alkali Metals</option>
                    <option value="alkaline earth metal">
                        Alkine Earth Metals
                    </option>
                    <option value="metalloid">Metalloids</option>
                    <option value="halogen">Halogens</option>
                    <option value="transition metal">Transition Metals</option>
                </select>
                <select
                    name="standardstates"
                    id="standardstates"
                    className="filters sts"
                >
                    <option value="default" selected>
                        States
                    </option>
                    <option value="solid">Solid</option>
                    <option value="liquid">Liquid</option>
                    <option value="gas">Gas</option>
                </select>
                <select
                    name="bondingtype"
                    id="bondingtype"
                    className="filters bt"
                >
                    <option value="default" selected>
                        Bondingtype
                    </option>
                    <option value="diatomic">Diatomic</option>
                    <option value="atomic">Atomic</option>
                    <option value="metallic">Metallic</option>
                    <option value="covalent network">Covalent Network</option>
                </select>
            </div>
        </>
    );
};

export default OverviewPage;

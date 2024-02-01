import { useEffect, useState } from 'react';
import { fetchElementByAtomicNumber } from '../utils/fetchElements';
import { useNavigate, useParams } from 'react-router-dom';
import AtomView from '../components/Atom';
import { Element } from '../types/Element.interface';

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

    const standardStates = {
        liquid: '/fluid_gif_800px_transparent.gif',
        solid: '/cube_gif_800px_transparent.gif',
        gas: '/cloud_gif_800px_violet.gif',
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
            <header>
                <img
                    className={styles.logo}
                    src="/elements-rgb-wort-bild.svg"
                    onClick={returnHandler}
                />
                <img
                    className={styles.x}
                    src="/x.png"
                    onClick={returnHandler}
                />
            </header>
            <main className={styles.container}>
                <div className={styles.view}>
                    <AtomView element={element} />
                    <img
                        className={`${styles.arrow} ${styles.left}`}
                        src="/arrow-left.png"
                        onClick={() => onArrowClickHandler('left')}
                    />
                    <img
                        className={`${styles.arrow} ${styles.right}`}
                        src="/arrow-right.png"
                        onClick={() => onArrowClickHandler('right')}
                    />
                    <div id="stage"></div>
                </div>
                <div className={styles.info}>
                    <section>
                        <div className={styles.symbol}>
                            <h4>{element?.atomicNumber}</h4>
                            <h1>{element?.symbol}</h1>
                            <h4>{element?.name}</h4>
                        </div>
                        <div className={styles.attributes}>
                            <p>
                                <span className="att-title">group block</span>
                                <span
                                    className="att-text"
                                    id="groupblock"
                                ></span>
                            </p>
                            <p>
                                <span className="att-title">boiling point</span>
                                <span className="att-text">
                                    {element?.boilingPoint}
                                </span>
                            </p>
                            <p>
                                <span className="att-title">
                                    electronegativity
                                </span>
                                <span className="att-text">
                                    {element?.electronegativity}
                                </span>
                            </p>
                            <p>
                                <span className="att-title">
                                    year discovered
                                </span>
                                <span className="att-text" id="yeardiscovered">
                                    {element?.yearDiscovered}
                                </span>
                            </p>
                        </div>
                    </section>
                    <img src={standardStates[element?.standardState]} />
                    <p className={styles.eState}>{element?.standardState}</p>
                </div>
            </main>
        </>
    );
};

export default ElementPage;

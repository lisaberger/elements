import { useEffect, useState } from 'react';
import { fetchElementByAtomicNumber } from '../utils/fetchElements';
import { useNavigate, useParams } from 'react-router-dom';
import Atom from '../components/Atom';
import { Element } from '../types/Element.interface';

import styles from './ElementPage.module.scss';
import Logo from '../components/shared/Logo';
import ElementInfo from '../components/ElementInfo';
import Icon from '../components/Icon';

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

    const onArrowClickHandler = (direction: string) => {
        if (direction === 'left') {
            navigate(`/element/${Number(id) - 1}`);
        } else {
            navigate(`/element/${Number(id) + 1}`);
        }
    };

    return (
        <>
            <main className={styles.container}>
                <section className={styles.view}>
                    <div className="p-4 absolute z-4 flex w-full align-items-center justify-content-between">
                        <Logo size="medium" />
                        <Icon icon="x" onClick={returnHandler} />
                    </div>

                    <div className="z-1">
                        <Atom element={element} />
                        <span className={styles.left}>
                            <Icon
                                icon="arrow-left"
                                onClick={() => onArrowClickHandler('left')}
                            />
                        </span>
                        <span className={styles.right}>
                            <Icon
                                icon="arrow-right"
                                onClick={() => onArrowClickHandler('right')}
                            />
                        </span>
                    </div>
                </section>
                <section className={styles.info}>
                    <ElementInfo element={element} />
                </section>
            </main>
        </>
    );
};

export default ElementPage;

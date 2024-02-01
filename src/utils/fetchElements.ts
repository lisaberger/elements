import { Element } from '../types/Element.interface';

export const fetchElements = async (): Promise<Element[] | Error> => {
    // JSON read call
    try {
        const response = await fetch('../../../data/periodic-table.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching elements:', error.message);
        throw error;
    }
};

export const fetchElementByAtomicNumber = async (
    id: number,
): Promise<Element | Error> => {
    // JSON read call
    try {
        const response = await fetch('../../../data/periodic-table.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const elements = await response.json();

        return elements[id - 1];
    } catch (error) {
        console.error('Error fetching elements:', error.message);
        throw error;
    }
};

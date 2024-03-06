import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Element } from '@/types/Element.interface';
import { RootState } from '@/store/store';

interface ElementState {
    elements: Element[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ElementState = {
    elements: [],
    status: 'idle',
    error: null,
};

export const fetchElements = createAsyncThunk<Element[]>(
    'elements/fetchElements',
    async () => {
        const response = await fetch('/data/periodic-table.json');

        if (!response.ok) {
            throw new Error('Failed to fetch elements');
        }

        return response.json();
    },
);

export const fetchElementByAtomicNumber = createAsyncThunk<
    Element | null,
    number
>('elements/fetchElementByAtomicNumber', async (atomicNumber, { getState }) => {
    const elements = (getState() as RootState).elements.elements;
    const foundElement = elements.find(
        (element) => +element.atomicNumber === atomicNumber,
    );
    return foundElement || null;
});

const elementsSlice = createSlice({
    name: 'elements',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchElements.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchElements.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.elements = action.payload;
            })
            .addCase(fetchElements.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    },
});

/**
 * GETTERS
 */
export const getElementsStatus = (state: RootState) => state.elements.status;
export const getElementsError = (state: RootState) => state.elements.error;
export const selectAllElements = (state: RootState) => state.elements.elements;
export const selectElementByAtomicNumber = (
    state: RootState,
    atomicNumber: number,
) => {
    return (
        state.elements.elements.find(
            (element) => +element.atomicNumber === atomicNumber,
        ) || null
    );
};

/**
 * REDUCER
 */
export default elementsSlice.reducer;

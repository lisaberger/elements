import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Element } from '@/types/Element.interface';
import { RootState } from '@/store/store';
import { selectSearchQuery } from './searchSlice';

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
        const response = await fetch(`${process.env.PUBLIC_URL}/data/periodic-table.json`);

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

export const uniqueGroupBlocks = (state: RootState) => {
    const uniqueGroupBlocks = new Set<string>();
    state.elements.elements.forEach((element) =>
        uniqueGroupBlocks.add(element.groupBlock),
    );
    return uniqueGroupBlocks;
};

export const uniqueBondingTypes = (state: RootState) => {
    const uniqueBondingTypes = new Set<string>();
    state.elements.elements.forEach((element) =>
        uniqueBondingTypes.add(element.bondingType),
    );
    return uniqueBondingTypes;
};

export const uniqueStandardStates = (state: RootState) => {
    const uniqueStandardStates = new Set<string>();
    state.elements.elements.forEach((element) =>
        uniqueStandardStates.add(element.standardState),
    );
    return uniqueStandardStates;
};

export const includeElementByStandardState =
    (state: RootState) => (element: Element) => {
        const selectedStandardState = state.filters.standardState;

        if (!selectedStandardState) {
            return true;
        }

        return selectedStandardState === element.standardState;
    };

export const includeElementByBondingType =
    (state: RootState) => (element: Element) => {
        const selectedBondingType = state.filters.bondingType;

        if (!selectedBondingType) {
            return true;
        }

        return selectedBondingType === element.bondingType;
    };

export const includeElementByGrouBlock =
    (state: RootState) => (element: Element) => {
        const selectedGroupBlock = state.filters.groupBlock;

        if (!selectedGroupBlock) {
            return true;
        }

        return selectedGroupBlock === element.groupBlock;
    };

export const filteredElements = (state: RootState) => {
    return state.elements.elements
        .filter(includeElementByStandardState(state))
        .filter(includeElementByBondingType(state))
        .filter(includeElementByGrouBlock(state));
};

export const searchedAndFilteredElements = (state: RootState) => {
    const query = selectSearchQuery(state).toLowerCase();

    return state.elements.elements
        .filter(includeElementByStandardState(state))
        .filter(includeElementByBondingType(state))
        .filter(includeElementByGrouBlock(state))
        .filter((element) => {
            if (!query) return true;

            return (
                element.name.toLowerCase().includes(query) ||
                element.symbol.toLowerCase().includes(query) ||
                element.atomicNumber.includes(query) ||
                element.groupBlock.toLowerCase().includes(query) ||
                element.bondingType.toLowerCase().includes(query) ||
                element.standardState.toLowerCase().includes(query)
            );
        });
};

/**
 * REDUCER
 */
export default elementsSlice.reducer;

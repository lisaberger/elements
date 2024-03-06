// filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import {
    uniqueBondingTypes,
    uniqueGroupBlocks,
    uniqueStandardStates,
} from '@/store/slices/elementsSlice';

interface Filters {
    groupBlock: string;
    standardState: string;
    bondingType: string;
}

const initialState: Filters = {
    groupBlock: '',
    standardState: '',
    bondingType: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFilter: (
            state,
            action: PayloadAction<{ key: keyof Filters; value: string }>,
        ) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        resetFilters: () => {
            return initialState;
        },
    },
});

/**
 * REDUCER
 */
export default filtersSlice.reducer;

/**
 * GETTERS
 */
export const selectFilters = (state: RootState) => state.filters;

export const filterOptions = (state: RootState) => {
    return {
        groupBlock: Array.from(uniqueGroupBlocks(state)).map((groupBlock) => ({
            value: groupBlock,
            label: groupBlock.charAt(0).toUpperCase() + groupBlock.slice(1),
        })),
        standardState: Array.from(uniqueStandardStates(state)).map(
            (standardState) => ({
                value: standardState,
                label:
                    standardState.charAt(0).toUpperCase() +
                    standardState.slice(1),
            }),
        ),
        bondingType: Array.from(uniqueBondingTypes(state)).map(
            (bondingType) => ({
                value: bondingType,
                label:
                    bondingType.charAt(0).toUpperCase() + bondingType.slice(1),
            }),
        ),
    };
};

/**
 * ACTIONS
 */
export const { updateFilter, resetFilters } = filtersSlice.actions;

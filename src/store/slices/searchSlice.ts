import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '@/store/store';

interface SearchState {
    query: string;
}

const initialState: SearchState = {
    query: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        clearSearch(state) {
            state.query = '';
        },
    },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.query;

export default searchSlice.reducer;

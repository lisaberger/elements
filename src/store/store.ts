import { configureStore } from '@reduxjs/toolkit';

import elementsReducer from './slices/elementsSlice';
import filtersReducer from './slices/filtersSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        elements: elementsReducer,
        filters: filtersReducer,
        search: searchReducer,
    },
    devTools: import.meta.env.MODE === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

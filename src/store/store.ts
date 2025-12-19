import { configureStore } from '@reduxjs/toolkit';

import elementsReducer from '@/store/slices/elementsSlice';
import filtersReducer from '@/store/slices/filtersSlice';
import searchReducer from '@/store/slices/searchSlice';

export const store = configureStore({
    reducer: {
        elements: elementsReducer,
        filters: filtersReducer,
        search: searchReducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

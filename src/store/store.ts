import { configureStore } from '@reduxjs/toolkit';
import elementsReducer from '@/store/slices/elementsSlice';
import filtersReducer from '@/store/slices/filtersSlice';

export const store = configureStore({
    reducer: {
        elements: elementsReducer,
        filters: filtersReducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

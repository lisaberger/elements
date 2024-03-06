import { configureStore } from '@reduxjs/toolkit';
import elementsReducer from '@/store/slices/elementsSlice';

export const store = configureStore({
    reducer: {
        elements: elementsReducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice.ts';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

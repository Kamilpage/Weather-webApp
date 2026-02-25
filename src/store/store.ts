import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import weatherReducer from './weatherSlice.ts';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {mockWeather} from "../Components/model/mockWeather.js";

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return mockWeather;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        loading: false,
        error: null,
        city: 'Moscow'
    },
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
        loadMockWeather(state) {
            state.data = mockWeather;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка';
            });
    },
});

export const { setCity, loadMockWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
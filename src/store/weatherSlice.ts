import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {mockWeather} from "../Components/model/mockWeather";
import {WeatherData} from "../shared/types/weather";


interface WeatherState {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
    city: string;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
    city: 'Tashkent'
};

export const fetchWeather = createAsyncThunk<WeatherData, string>(
    'weather/fetchWeather',
    async (city) => {
        await new Promise(res => setTimeout(res, 1000));
        return mockWeather;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error';
            });
    }
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockCities } from "@/Components/model/mockCities";
import { mockWeeklyForecast } from "@/Components/model/mockWeeklyForecast";
import { WeatherData } from "@/shared/types/weather";

interface WeatherState {
    data: WeatherData | null;
    weekly: any[] | null;
    loading: boolean;
    error: string | null;
    city: string;
}

const initialState: WeatherState = {
    data: null,
    weekly: null,
    loading: false,
    error: null,
    city: "Tashkent",
    notFound: false
};

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string, { rejectWithValue }) => {
        await new Promise(res => setTimeout(res, 500));

        if (!mockCities[city]) {
            return rejectWithValue("NOT_FOUND");
        }

        return {
            current: mockCities[city].current,
            location: mockCities[city].location,
            weekly: mockWeeklyForecast[city]
        };
    }
);

const slice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = false;
                state.error = null;
                state.notFound = false;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.weekly = action.payload.weekly;
                state.notFound = false;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;

                if (action.payload === "NOT_FOUND") {
                    state.notFound = true;
                    state.data = null;
                    state.weekly = null;
                    return;
                }

                state.error = action.error.message || "Ошибка";
            })
    }
});

export const { setCity } = slice.actions;
export default slice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../utils/api";
import axiosInstance from "../utils/axios.interceptors";

interface WeatherState {
    weather: any;
    dailyItems: any;
    hourlyItems: any;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: WeatherState = {
    weather: null,
    dailyItems: null,
    hourlyItems: null,
    status: "idle",
    error: null,
};

const generateQuery = ({ location, finalValue, unit }: any) => {
    let query;
    const lan = location.latitude.toFixed(2);
    const lon = location.longitude.toFixed(2);
    const lanQuery = lan ? `lan=${lan}` : "";
    const lonQuery = lon ? `&lon=${lon}` : "";
    const cityQuery = finalValue?.length ? `&q=${finalValue}` : "&q=Yerevan";
    const unitQuery = unit?.length ? `&unit=${unit}` : ""; // Empty string is for Kelvin
    query = `${lanQuery}${lonQuery}${cityQuery}&appid=${API_KEY}${unitQuery}`;

    return query;
};

export const fetchWeather: any = createAsyncThunk("weather/fetchWeather", async ({ location, finalValue }: any) => {
    try {
        const query = generateQuery({ location, finalValue });
        console.log(query);
        const response = await axiosInstance.get(`data/2.5/weather?${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
});

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.weather = action.payload.weather;
                state.error = null;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch weather";
            });
    },
});

export default weatherSlice.reducer;

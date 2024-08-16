import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../utils/api";
import axiosInstance from "../utils/axios.interceptors";

interface WeatherState {
    weather: any;
    city: any;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: WeatherState = {
    weather: null,
    city: null,
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
    const unitQuery = unit?.length ? `&units=${unit}` : ""; // Empty string is for Kelvin
    query = `${lanQuery}${lonQuery}${cityQuery}&appid=${API_KEY}${unitQuery}`;

    return query;
};

export const fetchWeather: any = createAsyncThunk(
    "weather/fetchWeather",
    async ({ location, finalValue, unit }: any) => {
        try {
            const query = generateQuery({ location, finalValue, unit });
            const response = await axiosInstance.get(`data/2.5/forecast?${query}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching weather:", error);
            throw error;
        }
    }
);

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
                const list = action.payload.list;
                let newList: any = [];

                if (list) {
                    let currentItemsStartIndex = 0;

                    list.forEach((item: any, index: number) => {
                        const dateTimeString = item.dt_txt;
                        const timePart = dateTimeString.split(" ")[1];
                        const hours = timePart.split(":")[0];

                        if (hours === "00") {
                            newList.push(list.slice(currentItemsStartIndex, index));
                            currentItemsStartIndex = index;
                        }
                    });

                    if (currentItemsStartIndex < list.length) {
                        newList.push(list.slice(currentItemsStartIndex));
                    }
                }

                console.log(newList);

                state.status = "succeeded";
                state.weather = newList;
                state.city = action.payload.city;
                state.error = null;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch weather";
            });
    },
});

export default weatherSlice.reducer;

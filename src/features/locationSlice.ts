import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCurrentLocation from "../utils/geoLocation";

interface LocationState {
    location: {
        latitude: number;
        longitude: number;
    } | null;
}

const initialState: LocationState = {
    location: null,
};

export const getLocation: any = createAsyncThunk("location/getLocation", async () => {
    const res = await getCurrentLocation();
    return res;
});

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        updateValue: (state, action) => {
            state.location = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLocation.fulfilled, (state, action) => {
            state.location = action.payload;
        });
    },
});

export const { updateValue } = locationSlice.actions;

export default locationSlice.reducer;

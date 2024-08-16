import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    value: string;
    finalValue: string;
    unit: string;
}

const initialState: SearchState = {
    value: "",
    finalValue: "",
    unit: "metric",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateValue: (state, action) => {
            state.value = action.payload;
        },
        updateFinalValue: (state, action) => {
            state.finalValue = action.payload;
        },
        updateUnit: (state, action) => {
            state.unit = action.payload;
        },
    },
});

export const { updateValue, updateFinalValue, updateUnit } = searchSlice.actions;

export default searchSlice.reducer;

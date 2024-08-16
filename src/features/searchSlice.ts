import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
  finalValue: string;
}

const initialState: SearchState = {
  value: "",
  finalValue: "",
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
  },
});

export const { updateValue, updateFinalValue } = searchSlice.actions;

export default searchSlice.reducer;

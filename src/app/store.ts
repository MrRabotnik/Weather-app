import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import searchReducer from "../features/searchSlice";
import locationReducer from "../features/locationSlice";

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        search: searchReducer,
        location: locationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

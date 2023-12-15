import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import petsReducer from "../features/pets/petsSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        pets: petsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

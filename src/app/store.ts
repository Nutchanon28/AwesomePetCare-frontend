import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import petsReducer from "../features/pets/petsSlice";
import { apiSlice } from "../api/apiSlice";
import servicesReducer from "../features/services/servicesSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        pets: petsReducer,
        services: servicesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

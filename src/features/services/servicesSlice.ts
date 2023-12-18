import { createSlice } from "@reduxjs/toolkit";
// TODO: change this file name (auth to store)
import { StoreState } from "../../types/auth";

interface ServiceState {
    step: number;
    tier: string | null;
    pets: Pet[];
    time: string | null;
    price: number;
}

interface Pet {
    _id: string;
    ownerId: string;
    name: string;
    type: string;
    breed: string;
    foodAllergies: string;
    congenitalDisease: string;
    image: string;
    description?: string;
}

const servicesSlice = createSlice({
    name: "services",
    /* how to define a type for pets? */
    initialState: {
        step: 0,
        tier: null,
        pets: [],
        time: null,
        price: 0,
    } as ServiceState,
    reducers: {
        setStep: (state, action) => {
            const { step, mode } = action.payload;
            state.step = step
                ? step
                : mode === "next"
                ? state.step + 1
                : state.step - 1;
        },
        setTier: (state, action) => {
            const tier = action.payload;
            state.tier = tier;
        },
        addPet: (state, action) => {
            const pet = action.payload;
            state.pets.push(pet);
        },
        removePet: (state, action) => {
            const id = action.payload;
            state.pets = [...state.pets].filter(pet => pet._id !== id);
        },
        setTime: (state, action) => {
            const time = action.payload;
            state.time = time;
        },
        setPrice: (state, action) => {
            const { price, mode } = action.payload;
            state.price =
                mode === "increase" ? state.price + price : state.price - price;
        },
    },
});

export const { setStep, setTier, addPet, removePet, setTime, setPrice } = servicesSlice.actions;

export default servicesSlice.reducer;

export const selectCurrentService = (state: StoreState) => state.services;

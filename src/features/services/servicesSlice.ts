import { createSlice } from "@reduxjs/toolkit";
// TODO: change this file name (auth to store)
import { StoreState } from "../../types/auth";

type Price = {
    [key: string]: number;
};

interface ServiceState {
    step: number;
    tier: string | null;
    pets: Pet[];
    time: Date | null;
    price: Price;
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
        price: {},
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
            const { tier, price } = action.payload;
            state.tier = tier;
            state.price = { ...state.price, tier: price };
        },
        addPet: (state, action) => {
            const { pet, price } = action.payload;
            state.pets.push(pet);
            state.price = { ...state.price, [pet._id]: price };
        },
        removePet: (state, action) => {
            const id = action.payload;
            state.pets = state.pets.filter((pet) => pet._id !== id);
            const { [id]: _, ...newPrice } = state.price as Price;
            state.price = newPrice;
        },
        setTime: (state, action) => {
            const time = action.payload;
            state.time = time;
        },
    },
});

export const { setStep, setTier, addPet, removePet, setTime } =
    servicesSlice.actions;

export default servicesSlice.reducer;

export const selectCurrentService = (state: StoreState) => state.services;

export const selectCurrentPrice = (state: StoreState) =>
    Object.entries(state.services.price).reduce(
        (prev, price) => prev + price[1],
        0
    );

import {
    createSlice,
    nanoid,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";

const petsAdapter = createEntityAdapter();

const initialState = petsAdapter.getInitialState({
    status: "idle",
    error: null,
});

// const petsSlice = createSlice({
//     name: 'pets',
//     initialState,
//     reducers: 
// })

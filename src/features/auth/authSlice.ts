import { createSlice } from "@reduxjs/toolkit";
import { StoreState } from "../../types/auth";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, roles: [], token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, roles, accessToken } = action.payload;
            state.user = user || null;
            state.roles = roles;
            state.token = accessToken;
        },
        logOut: (state) => {
            // TODO: clear storage when forced log out.
            localStorage.clear();
            state.user = null;
            state.roles = [];
            state.token = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: StoreState) => state.auth.user;
export const selectCurrentRoles = (state: StoreState) => state.auth.roles;
export const selectCurrentToken = (state: StoreState) => state.auth.token;

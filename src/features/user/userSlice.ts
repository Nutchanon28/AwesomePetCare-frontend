import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { name: "", username: "", avatarPath: "" },
    reducers: {
        setUser: (state, action) => {
            const { name, username, avatarPath } = action.payload;
            state.name = name;
            state.username = username;
            state.avatarPath = avatarPath;
        },
    },
});

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
    name: "logged",
    initialState: { loggedIn: false },
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
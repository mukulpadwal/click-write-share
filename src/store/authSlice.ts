import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoggedIn: boolean, userData: {} | null } = {
    isLoggedIn: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

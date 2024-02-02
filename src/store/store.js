import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice"

const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
});

export default store;
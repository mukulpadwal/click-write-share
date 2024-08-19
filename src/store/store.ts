import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import blogSliceReducer from "./blogSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        blog: blogSliceReducer
    },
});

export default store;

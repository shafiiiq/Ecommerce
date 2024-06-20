import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./account";

const store = configureStore({
    reducer: {
        cart: productReducer,
        // Add other reducers here if needed
    },
});

export default store;

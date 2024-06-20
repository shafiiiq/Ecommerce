import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, cartReducer } from "./account";

const store = configureStore({
    reducer: {
        account: accountReducer,
        cart: cartReducer,
        // Add other reducers here if needed
    },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart slice
const cartInitialState = {
    productCount: '',
    products: []
};

// Create cart slice
const productSlice = createSlice({
    name: "product",
    initialState: cartInitialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.productCount = action.payload.length;
        }
    },
});


export const { setProducts } = productSlice.actions;

// Export reducers
export const productReducer = productSlice.reducer;

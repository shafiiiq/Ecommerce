import { createSlice } from "@reduxjs/toolkit";

// Initial state for the account slice
const accountInitialState = {
    isLoggedIn: false,
    showNavbar: true,
    showSign: false,
    showLogin: true,
};

// Create account slice
const accountSlice = createSlice({
    name: "account",
    initialState: accountInitialState,
    reducers: {
        showAccount: (state) => {
            state.isLoggedIn = true;
            state.showNavbar = false;
        },
        hideAccount: (state) => {
            state.isLoggedIn = false;
            state.showNavbar = true;
        },
        resetNavbar: (state) => {
            state.showNavbar = true;
        },
        showSign: (state) => {
            state.showSign = true;
            state.showLogin = false;
        },
        showLogin: (state) => {
            state.showLogin = true;
            state.showSign = false;
        },
    },
});

// Initial state for the cart slice
const cartInitialState = {
    cartCount: '',
    cartItems: []
};

// Create cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            state.cartCount = action.payload.length;
        }
    },
});

// Export actions from slices
export const {
    showAccount,
    hideAccount,
    resetNavbar,
    showLogin,
    showSign,
} = accountSlice.actions;

export const { setCartItems } = cartSlice.actions;

// Export reducers
export const accountReducer = accountSlice.reducer;
export const cartReducer = cartSlice.reducer;

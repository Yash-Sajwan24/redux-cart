import { createSlice } from "@reduxjs/toolkit";

const initialCheckout = {
    isCheckout: false, 
};

const checkoutSlice = createSlice({
    name: 'checkout', 
    initialState: initialCheckout, 
    reducers: {
        toggle(state){
            state.isCheckout = !state.isCheckout;
        }
    }
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
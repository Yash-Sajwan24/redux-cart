import { createSlice } from "@reduxjs/toolkit";

const initialCheckout = {
    isCheckout: false, 
    notification: null, 
};

const checkoutSlice = createSlice({
    name: 'checkout', 
    initialState: initialCheckout, 
    reducers: {
        toggle(state){
            state.isCheckout = !state.isCheckout;
        },
        showNotification(state, action){
            state.notification = {
                status : action.payload.status, 
                title : action.payload.title, 
                message :action.payload.message , 
            }
        },
        toggleAlert(state){
            state.notification = null;
        }
    }
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
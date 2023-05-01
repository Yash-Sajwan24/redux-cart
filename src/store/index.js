import { configureStore } from "@reduxjs/toolkit";
import {checkoutReducer} from './cart';
import { cartFunctionReducer } from "./cartfunction";



const store = configureStore({
    reducer: {
        cart : checkoutReducer, 
        cartFunction : cartFunctionReducer,
    }
});


export default store;
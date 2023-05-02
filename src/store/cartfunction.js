import { createSlice } from "@reduxjs/toolkit";
import { checkoutActions } from "./cart";

const cartFunction = createSlice({
  name: "cartfunction",
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalItems++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalItems--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//thunk - A function that delyas an action until later
//an action function that does not reaturn the action itself but another function which eventually
//return the action

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      checkoutActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "sending cart data ...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://custom-a5d73-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        checkoutActions.showNotification({
          status: "success",
          title: "Data sent",
          message: "the data has been sent..",
        })
      );
    } catch {
      sendCartData().catch((error) => {
        dispatch(
          checkoutActions.showNotification({
            status: "error",
            title: "Error!!",
            message: "sending cart data failed",
          })
        );
      });
    }
  };
};

export const cartFunctionReducer = cartFunction.reducer;
export const cartFunctionActions = cartFunction.actions;

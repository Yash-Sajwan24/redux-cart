import { checkoutActions } from "./cart";
import { cartFunctionActions } from "./cartfunction";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://custom-a5d73-default-rtdb.firebaseio.com/cart.json"
      );

      if(!response.ok){
        throw new Error('could not fetch data');
      }
      const data = response.json();
      return data;
    };

    try{
      const cartData =  await fetchData();
      dispatch(cartFunctionActions.replaceCart(cartData));
    }
    catch(error){
        dispatch(
            checkoutActions.showNotification({
              status: "error",
              title: "Error!!",
              message: "fetching cart data failed",
            })
          );
    }
  };
};

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

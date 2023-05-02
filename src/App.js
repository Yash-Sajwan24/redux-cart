import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { checkoutActions } from "./store/cart";
import Notification from "./components/UI/Notification";

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.isCheckout);
  const cart = useSelector((state) => state.cartFunction);
  const notification = useSelector((state) => state.cart.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        checkoutActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "sending cart data ...",
        })
      );
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

      dispatch(
        checkoutActions.showNotification({
          status: "success",
          title: "Data sent",
          message: "the data has been sent..",
        })
      );
    };
    sendCartData().catch((error) => {
      dispatch(
        checkoutActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "sending cart data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

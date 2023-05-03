import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import {sendCartData, fetchCartData} from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.isCheckout);
  const cart = useSelector((state) => state.cartFunction);
  const notification = useSelector((state) => state.cart.notification);

  useEffect(() => {
      if(isInitial){
        isInitial = false;
        dispatch(fetchCartData());
        return;
      }

      dispatch(sendCartData(cart));
   
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

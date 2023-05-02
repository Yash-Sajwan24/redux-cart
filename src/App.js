import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const showCart = useSelector(state => state.cart.isCheckout);
  const cart = useSelector(state => state.cartFunction);

  const url = 'https://custom-a5d73-default-rtdb.firebaseio.com/cart.json';

  useEffect(() => {
    fetch(url, {
      method : 'PUT', 
      body: JSON.stringify(cart),
    })
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

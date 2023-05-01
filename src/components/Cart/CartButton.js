import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import {checkoutActions} from '../../store/cart'
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const cartQuantity = useSelector(state => state.cartFunction.totalItems);

  const dispatch = useDispatch();
  const onClickHandler = () => {
      dispatch(checkoutActions.toggle());
  }
  
  return (
    <button onClick={onClickHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;

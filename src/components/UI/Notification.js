import './Notification.css';
import { useDispatch } from 'react-redux';
import { checkoutActions } from '../../store/cart';
const Notification = (props) => {
    const dispatch = useDispatch();
    const onClickHandler =() => {
        dispatch(checkoutActions.toggleAlert());
    }
  return (
    <div className={`alert ${props.status}`}>
      <div className='title'>{props.title}</div>
      <div className='message'>{props.message}
    <button onClick = {onClickHandler}> ❌</button>
      </div>

    </div>
  );
};

export default Notification;

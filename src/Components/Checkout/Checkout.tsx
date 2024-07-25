import React , {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { emptyCart } from '../../Redux/Actions/CartActions'; 
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  const user = useSelector((state: RootState) => state.usEr.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedNow = () => {
    dispatch(emptyCart());
    setIsPurchaseComplete(true);
  };

  const handleLogin = () =>{
    navigate('/login');
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {isPurchaseComplete ? (
        <div>Thank You for your purchase!</div>
      ) : (
        <>
          {user ? (
            <div className="user-info">
              <h3>Delivering to:</h3>
              <p>
                <strong>
                  {user.name.firstname.charAt(0).toUpperCase() + user.name.firstname.slice(1)}{' '}
                  {user.name.lastname.charAt(0).toUpperCase() + user.name.lastname.slice(1)}
                </strong>
              </p>
              <p>
                {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          ) : (
            <p>No user information available. <span onClick = {handleLogin}>Please log in to proceed.</span></p>
          )}

          <div className="cart-summary">
            <h3>Cart Summary:</h3>
            {cartItems.length > 0 ? (
              <div>
                <ul>
                  {cartItems.map(item => (
                    <li key={item.id}>
                      <span>{item.title}</span>
                      <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <p className="total-amount">
                  <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
                </p>
              </div>
            ) : (
              <p>Your cart is empty. Please add items to your cart before proceeding.</p>
            )}
          </div>
          {cartItems.length > 0 && user && (
            <button className='proceed-now' onClick={handleProceedNow}>Proceed Now</button>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;

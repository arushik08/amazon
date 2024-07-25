import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Store";
import { Product } from "../../Redux/Types";
import { removeFromCart, updateCartQuantity, setTotalItems } from "../../Redux/Actions/CartActions"; 
import './Cart.css';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 0
      return acc;
    }, {} as { [key: number]: number })
  );

  useEffect(() => {
    setQuantities(
      cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity || 0;
        return acc;
      }, {} as { [key: number]: number })
    );
    dispatch(setTotalItems(cartItems.reduce((acc, item) => acc + item.quantity, 0)));
  }, [cartItems, dispatch]);

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product.id));
  };

  const handleQuantityChange = (product: Product, quantity: number) => {
    if (quantity < 1) return;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: quantity,
    }));
    
    dispatch(updateCartQuantity(product.id, quantity));
  };

  const handleIncrement = (product: Product) => {
    handleQuantityChange(product, quantities[product.id] + 1);
  };

  const handleDecrement = (product: Product) => {
    handleQuantityChange(product, quantities[product.id] - 1);
  };

  const handleBuyNow = () => {
    navigate('/checkout'); 
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 0),
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrement(item)} className="quantity-button">-</button>
                  <span className="quantity-display">{quantities[item.id]}</span>
                  <button onClick={() => handleIncrement(item)} className="quantity-button">+</button>
                </div>
                <button className="remove-from-cart" onClick={() => handleRemoveFromCart(item)}>Remove From Cart</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleBuyNow} className="buy-now">
            Check Out
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import amazonLogo from '../../assets/amazon-logo.png';
import usaFlag from '../../assets/usa-flag.jpg';
import { FaUserCircle } from 'react-icons/fa';
import Categories from '../Categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../Utils';
import { emptyCart } from '../../Redux/Actions/CartActions';
import product from '../Products/Products';

const Header: React.FC = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const reduxUser = useSelector((state: RootState) => state.usEr.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsListOpen(false);
    }
    else{
      setIsListOpen(true);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

   // Filter the products based on the search term

  useEffect(() => {
  
    if (isListOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isListOpen]);

  return (
    <div className="page-container">
      <header>
        <div className="first">
          <div className="flex logo">
            <a href="#">
              <img src={amazonLogo} alt="amazon" className="amazon-logo" />
            </a>
            <div className="map flex">
              <i className="fas fa-map-marker" />
              <div>
                <span>Deliver To</span>
                <span>{reduxUser ? `${capitalizeFirstLetter(reduxUser.address.city)}` : 'India'}</span>
              </div>
            </div>
          </div>
          <div className="flex input">
            <div>
              <span>All</span>
              <i className="fas fa-caret-down" />
            </div>
            <input type="text" />
            <i className="fas fa-search" />
          </div>
          <div className="flex right">
            <div className="flex lang">
              <img src={usaFlag} alt="" className="usa" />
              <i className="fas fa-caret-down" />
            </div>
            <div className="sign">
              <span>{reduxUser ? `Hello, ${capitalizeFirstLetter(reduxUser.name.firstname)}` : 'Hello, Sign In'}</span>
              <div className="flex ac">
                <span onClick={toggleList} ref={listRef}>Account &amp; Lists</span>
                <i className="fas fa-caret-down" />
                {isListOpen && (
                  <div className="dropdown-list">
                    <div>
                      <h3>Your Lists</h3>
                      <ul>
                        <li>Create a List</li>
                        <li>Find a list &amp; Registry</li>
                        <li>Amazon Smile Charity Lists</li>
                      </ul>
                    </div>
                    <div className="hdn-line" />
                    <div>
                      <h3>Your Account</h3>
                      <ul>
                        <li>Account</li>
                        <li>Orders</li>
                        <li>Recommendations</li>
                        <li>Browsing History</li>
                        <li>Watchlists</li>
                        <li>Membership</li>
                        <li>Music Library</li>
                        <li onClick={handleLoginClick} {...dispatch(emptyCart())}>Logout</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="orders">
              <span>Returns</span>
              <span>&amp; Orders</span>
            </div>
            <div className="flex cart">
              <Link to="/cart">
                <i className="fas fa-shopping-cart" />
                <span className="ca" onClick={handleCartClick}>Cart</span>
                <p>{totalItems}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="second">
          <i className="fas fa-bars" />
          <div className="sidebar">
            <div className="hdn-head">
              <div className="user-icon" style={{ fontSize: '2rem' }}><FaUserCircle /></div>
              <h2 onClick={handleLoginClick} className="sign-in">{reduxUser ? `Hello, ${capitalizeFirstLetter(reduxUser.name.firstname)}` : 'Hello, Sign In'}</h2>
            </div>
            <div className="hdn-content">
              <h3>Digital Content &amp; Devices</h3>
              <ul>
                <div>
                  <li>Amazon Music</li>
                  <i className="fa-solid fa-angle-right" />
                </div>
                <div>
                  <li>Kindle E-readers &amp; Books</li>
                  <i className="fa-solid fa-angle-right" />
                </div>
                <div>
                  <li>Appstore for Android</li>
                  <i className="fa-solid fa-angle-right" />
                </div>
              </ul>
              <div className="line">
                <hr />
              </div>
            </div>
            <div className="hdn-content">
              <h3>Categories</h3>
              <Categories />
              <div className="line">
                <hr />
              </div>
            </div>
            <div className="hdn-content">
              <h3>Programs &amp; Features</h3>
              <ul>
                <div>
                  <li>Gift Cards</li>
                  <i className="fa-solid fa-angle-right" />
                </div>
                <div>
                  <li>#FoundItOnAmazon</li>
                  <i className="fa-solid fa-angle-right" />
                </div>
                <div>
                  <li>Amazon Live</li>
                  <i className="fa-solid fa-angle-right" />
                </div>
                <div className="line">
                  <hr />
                </div>
              </ul>
            </div>
          </div>
          <div className="second-2">
            <ul>
              <li>Today's Deal</li>
              <li>Customer Service</li>
              <li>Gift Cards</li>
              <li>Sell</li>
            </ul>
          </div>
          <div className="second-3">
            <span>Shop for Festivals</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

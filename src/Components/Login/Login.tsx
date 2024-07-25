import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoAmazon from '../../assets/Amazon-Logo.png';
import { setUser } from '../../Redux/userSLice';
import { User } from '../../Redux/Types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      const user = users.find((user: User) => user.email === email && user.password === password);

      if (user) {
        dispatch(setUser(user)); 
        console.log("user detail", user);
        
        navigate('/', { state: { user } });
      } else {
        // throw new Error('Error While Login!');
        alert('Please enter valid credentials')
      }
    } catch (error) {
      console.log('Error while logging in:', error);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <img src={logoAmazon} alt="amazon-logo" className="amazonLogo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Welcome !</h3>
        <div>
          <label> E-mail </label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
        <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>        
        </div>
        <button type="submit">Login</button>
        <p className="new">New to Amazon? <span className="click-here" onClick={handleSignUp}>Click Here</span></p>
      </form>
    </div>
  );
};

export default Login;

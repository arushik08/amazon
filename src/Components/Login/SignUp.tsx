import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setUser } from '../../Redux/userSLice';
import { useDispatch } from 'react-redux';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState<number | ''>('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    if (!email || !username || !password || !confirmPassword || !firstname || !lastname || !city || !street || !number || !zipcode || !phone) {
      alert('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser:any = {
      email,
      username,
      password,
      name: {
        firstname,
        lastname,
      },
      address: {
        city,
        street,
        number,
        zipcode,
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
      },
      phone,
    };

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);

      if(data.id==1){
        dispatch(setUser(newUser)); 

      localStorage.setItem('user', JSON.stringify(data));

      navigate('/', { state: { newUser: data } });

      }
      
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (  
    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Welcome to Amazon ! Create your Account</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group password-group">
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
        <div className="input-group password-group">
          <label>Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Number</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            required
          />
        </div>
        <div className="input-group">
          <label>Zipcode</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create your Amazon account</button>
      </form>
      <div className="login-redirect">
        <span>Already have an account? </span>
        <button onClick={() => navigate('/login')} className="signin-link">Sign in</button>
      </div>
    </div>
  );
};

export default SignUp;

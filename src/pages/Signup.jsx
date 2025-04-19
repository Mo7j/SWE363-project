// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\s-]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    if (field === 'name' || field === 'all') {
      if (!name) {
        newErrors.name = 'Full name is required';
      } else if (!nameRegex.test(name)) {
        newErrors.name = 'Name must be at least 2 characters and contain only letters, spaces, or hyphens';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'email' || field === 'all') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'password' || field === 'all') {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (!passwordRegex.test(password)) {
        newErrors.password =
          'Password must be at least 6 characters, including 1 uppercase letter, 1 number, and 1 special character';
      } else {
        delete newErrors.password;
      }
    }

    if (field === 'confirmPassword' || field === 'all') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password && confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    const isValid = validateField('all');
    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>

        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField('name', e.target.value);
            }}
            className={`input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            className={`input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField('password', e.target.value);
              validateField('confirmPassword', confirmPassword);
            }}
            className={`input ${errors.password ? 'error' : ''}`}
            placeholder="Create a password"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField('confirmPassword', e.target.value);
            }}
            className={`input ${errors.confirmPassword ? 'error' : ''}`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button onClick={handleRegister} className="signup-button">
          Sign Up
        </button>

        <p className="login-link">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

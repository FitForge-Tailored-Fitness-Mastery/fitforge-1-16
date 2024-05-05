import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Signup.css'; // Make sure to create this CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
  
    try {
      // Make sure the URL matches the endpoint from your Express server
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data);
      // Handle success (redirect or show a message)
      navigate('/client-home');
    } catch (error) {
      console.error('Signup error:', error.response.data);
      // Handle errors (show error message to user)
    }
  };
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>FitForge</h1>
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-tagline">Fitness is a click away</p>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Ensure you have a corresponding CSS file



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();


  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: email,      // Assuming 'email' is the state variable for the email input
      password: password // Assuming 'password' is the state variable for the password input
    };

    try {
      // Replace with your server's login endpoint if different
      const response = await axios.post('http://localhost:5000/login', loginData);
      console.log(response.data);
      // Handle success here. If login is successful:
      // You might want to redirect the user to another page or
      // save the login token in local storage or context for state management.
      navigate('/client-home');

    } catch (error) {
      console.error('Login error:', error.response.data);
      // Handle errors here. You may want to show the user a message explaining the login failed
      // and possibly clear the password field for security reasons.
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmitLogin} className="login-form">
          <h1>Login</h1>
          <div className="input-group">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              placeholder="username@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <p className="signup-link">
            New user? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

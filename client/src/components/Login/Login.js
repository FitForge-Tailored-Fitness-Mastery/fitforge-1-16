import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const loginData = { email, password };

        try {
            const response = await axios.post('http://localhost:5000/login', loginData);
            console.log(response);
            localStorage.setItem('clientId', response.data.clientId); // Save clientId in localStorage
            navigate('/client-home');
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
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

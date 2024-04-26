// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import TrainerProfile from './components/TrainerProfile/TrainerProfile';
//import TrainerProfile from './components/TrainerProfile/TrainerProfile';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};;

export default App;

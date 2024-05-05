import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Index from './components/Index/Index';
import ClientHome from './components/ClientHome/ClientHome';
import WorkoutHistory from './components/WorkoutHistory/WorkoutHistory';
import Profile from './components/Profile/Profile';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/index" element={<Index />} />
          <Route path="/client-home" element={<ClientHome />} />
          <Route path="/workout-history" element={<WorkoutHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import TrainerProfile from './components/TrainerProfile/TrainerProfile';
import EditProfile from './components/Profile/EditProfile'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Index from './components/Index/Index';
import ClientHome from './components/ClientHome/ClientHome';
import WorkoutHistory from './components/WorkoutHistory/WorkoutHistory';
import './App.css';


const PrivateRoute = ({ children }) => {
  const clientId = localStorage.getItem('clientId');
  
  return clientId ? children : <Navigate to="/" />;
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/index" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/trainerprofile/:clientId" element={<PrivateRoute><TrainerProfile /></PrivateRoute>} />
          <Route path="/edit-profile/:clientId" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="/client-home" element={<PrivateRoute><ClientHome /></PrivateRoute>} />
          <Route path="/workout-history" element={<PrivateRoute><WorkoutHistory /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
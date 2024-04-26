import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import './clientHome.css'; // External CSS for workout summary

const Navigation = () => {
  return (
    <nav className="navbar" data-testid="navigation">
      <a href="workoutHistory.html" className="navbar-link">
        <FontAwesomeIcon icon={faDumbbell} />
      </a>
      <a href="#" className="navbar-link active">
        <FontAwesomeIcon icon={faHome} />
      </a>
      <a href="profile.html" className="navbar-link">
        <FontAwesomeIcon icon={faUser} />
      </a>
    </nav>
  );
};

export default Navigation;

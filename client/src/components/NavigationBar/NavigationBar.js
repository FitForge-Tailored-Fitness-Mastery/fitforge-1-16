import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css'; // External CSS for workout summary

const Navigation = () => {
  return (
    <nav className="navbar" data-testid="navigation">

      <Link to="/workout-history" className="navbar-link">
        <FontAwesomeIcon icon={faDumbbell} />
      </Link>

      <Link to="/client-home" className="navbar-link active">
        <FontAwesomeIcon icon={faHome} />
      </Link>

      <Link to="/profile" className="navbar-link">
        <FontAwesomeIcon icon={faUser} />
      </Link>

    </nav>
  );
};

export default Navigation;

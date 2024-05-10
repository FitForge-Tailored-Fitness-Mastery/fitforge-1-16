import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LogoutConfirmationDialog.css';

const LogoutConfirmationDialog = ({ onClose, onConfirm }) => {
  const navigate = useNavigate(); // Create the navigate function

  // Update the onConfirm function to navigate to login
  const handleConfirm = () => {
    onConfirm(); // Call the original onConfirm function if needed
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="backdrop">
      <div className="logout-dialog">
        <h2>Going so soon?</h2>
        <p>Are you sure you want to Logout?</p>
        <div className="logout-dialog-buttons">
          <button className="logout-dialog-button" onClick={onClose}>
            Cancel
          </button>
          <button className="logout-dialog-button" onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationDialog;

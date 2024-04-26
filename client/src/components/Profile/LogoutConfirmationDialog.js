import React from 'react';
import './LogoutConfirmationDialog.css';

const LogoutConfirmationDialog = ({ onClose, onConfirm }) => {
  return (
    <div className="backdrop">
      <div className="logout-dialog">
        <h2>Going so soon?</h2>
        <p>Are you sure you want to Logout?</p>
        <div className="logout-dialog-buttons">
          <button className="logout-dialog-button" onClick={onClose}>
            Cancel
          </button>
          <button className="logout-dialog-button" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationDialog;

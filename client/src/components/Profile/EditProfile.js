import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import './EditProfile.css';

const EditProfile = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    height: '',
    dob: '',
    weight: '',
  });
  const [error, setError] = useState(null); // Adding state to handle errors

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/client/${clientId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClient(data);
        setFormData({
          fname: data.fname,
          lname: data.lname,
          height: data.height,
          dob: data.dob,
          weight: data.weight,
        });
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load data');
      }
    };
    fetchClientData();
  }, [clientId]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log(e, name, value)
    if (name === 'dob') {
      const date = new Date(value);
      value = date.toISOString().slice(0, 10); // Converts date to YYYY-MM-DD format
      console.log('Formatted Date:', value); // Check the formatted date
    }
    setFormData({ ...formData, [name]: value });
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/client/${clientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Client updated:', data);
      navigate('/profile'); // Navigate back to the profile page after successful update
    } catch (error) {
      console.error('Update error:', error);
      setError(`Failed to update data: ${error.message}`); // Include the error message in the state
    }
  };  

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className='edit-profile-box'>
          <h2>Edit Profile</h2>
          {/* Displaying error message */}
          {error && <p className="error">{error}</p>}
          <form id='editprofileform' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height (cm):</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (lb):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className='editprofilebutton'>Save Changes</button>
          </form>
      </div>
      {/* Add Navigation Bar */}
      <NavigationBar />
    </div>
  );
};

export default EditProfile;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TrainerProfile.css';

const TrainerProfile = () => {
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [error, setError] = useState(null);
  const { clientId } = useParams(); // Destructure clientId from params

  useEffect(() => {
    // Function to fetch trainer details
    const fetchTrainerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/trainer/${clientId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrainerDetails(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchTrainerDetails();
  }, [clientId]); // Dependency array includes clientId to refetch when it changes

  if (!trainerDetails && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="trainer-profile-container">
      <div className="trainer-profile-header">
        {/* Image and name of the trainer */}
        <img src={trainerDetails?.imageUrl} alt={trainerDetails?.fname} className="trainer-profile-photo" />
        <h2 className="trainer-profile-name">{trainerDetails?.fname} {trainerDetails?.lname}</h2>
      </div>
      <div className="trainer-profile-details">
        <p>Email: {trainerDetails?.email}</p>
        <p>Phone: {trainerDetails?.phone}</p>
        {/* Other trainer details */}
      </div>
    </div>
  );
};

export default TrainerProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import './ClientHome.css';

const UpcomingWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const clientId = localStorage.getItem('clientId'); // Ensure this value is managed correctly in localStorage
        const fetchWorkouts = async () => {
            if (!clientId) {
                console.error('No client ID provided');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/client/${clientId}/sessions`);
                setWorkouts(response.data);
            } catch (error) {
                console.error('Failed to fetch workouts:', error.response ? error.response.data : error.message);
            }
        };

        fetchWorkouts();
    }, []); 

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="upcomingWorkout" data-testid="upcoming-workouts">
            <div className="uw-heading">
                <FontAwesomeIcon icon={faCalendar} /> Upcoming Workouts
            </div>
            <div className="flex-upcoming-workout-container">
                {workouts.length > 0 ? workouts.map((workout, index) => (
                    <div key={index} className="flex-container-workout"> {/* Using index as key because date and duration might not be unique */}
                        <div className="column1">
                            {/* Placeholder for image, adjust as needed */}
                            <img src="default.jpg" alt="Trainer" />
                        </div>
                        <div className="column2">
                            <div className="row1">Training with {workout.fname} {workout.lname}</div>
                            <div className="row2">{formatDate(workout.date)} for {workout.duration} minutes</div>
                        </div>
                    </div>
                )) : <p>No upcoming workouts found.</p>}
            </div>
        </div>
    );
};

export default UpcomingWorkouts;

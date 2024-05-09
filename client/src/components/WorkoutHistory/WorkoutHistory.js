import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavigationBar/NavigationBar';
import '../ClientHome/ClientHome.css';
import '../WorkoutHistory/WorkoutHistory.css';

const WorkoutHistory = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);

    useEffect(() => {
        const fetchWorkoutHistory = async () => {
            try {
                const clientId = localStorage.getItem('clientId'); // Assuming client ID is stored in localStorage
                if (!clientId) {
                    console.error('Client ID is missing');
                    return;
                }
                const response = await axios.get(`http://localhost:5000/client/${clientId}/workouts`);
                setWorkoutHistory(response.data);
            } catch (error) {
                console.error('Failed to fetch workout history:', error);
            }
        };

        fetchWorkoutHistory();
    }, []);

    return (
        <div className="workout-history">
            <div className="history-title">Workout History</div>
            {workoutHistory.length > 0 ? workoutHistory.map((workout, index) => (
                <div key={index} className="flex-workout-history-day-container">
                    <div className="flex-heading">
                        <i className="fas fa-calendar"></i> <b>{new Date(workout.date).toLocaleDateString()}</b>
                    </div>
                    <div className="flex-container-workouthistory">
                        <div className="column1">
                            <img src="target.png" alt="Workout" />
                        </div>
                        <div className="column2">
                            <div className="row1">{workout.exercise_name} with {workout.fname} {workout.lname}</div>
                            <div className="row2">Time - {workout.duration} minutes</div>
                            <div className="row3">Calories Burned - {workout.calories_burned}</div>
                            <div className="row4">{workout.sets}</div>
                            <div className="row5">{workout.description}</div>
                        </div>
                    </div>
                </div>
            )) : <p>No workout history found.</p>}
            <Navigation />
        </div>
    );
};

export default WorkoutHistory;

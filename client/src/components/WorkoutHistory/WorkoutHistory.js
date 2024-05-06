import React from 'react';
import Navigation from '../ClientHome/Navigation';
import '../ClientHome/ClientHome.css'; // Import associated styles for navbar
import '../WorkoutHistory/WorkoutHistory.css'; // Import associated styles

const WorkoutHistory = () => {
    return (
        <div className="workout-history">
            {/* Add Navigation Bar */}
            <Navigation />
        </div>
    );
};

export default WorkoutHistory;

import React from 'react';
import Navigation from '../NavigationBar/NavigationBar'; // Import Navigation component
import ProgressChart from './ProgressChart'; // Import ProgressChart component
import UpcomingWorkouts from './UpcomingWorkouts'; // Import UpcomingWorkouts component
import WorkoutSummary from './WorkoutSummary'; // Import WorkoutSummary component
import './ClientHome.css'; // Import associated styles

const ClientHome = () => {
  return (
    <div className="client-home">

      {/* Add Workout Summary */}
      <WorkoutSummary />
      
      {/* Add Progress Chart */}
      <ProgressChart />

      {/* Add Upcoming Workouts */}
      <UpcomingWorkouts />

      {/* Add Navigation Bar */}
      <Navigation />

    </div>
  );
};

export default ClientHome;

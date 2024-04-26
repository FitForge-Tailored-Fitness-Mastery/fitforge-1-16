import React from 'react';
import Navigation from '../../components/Navigation';
import WorkoutSummary from '../../components/WorkoutSummary';
import ProgressChart from '../../components/ProgressChart';
import UpcomingWorkouts from '../../components/UpcomingWorkouts';
//import logo from './logo.svg';
import './Index.css'; // External CSS for overall styling


const Index = () => {
  return (
    <div className="app">
      <Navigation />
      <WorkoutSummary />
      <ProgressChart />
      <UpcomingWorkouts />
    </div>
     );
};

export default Index;
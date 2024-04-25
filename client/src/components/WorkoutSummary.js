import React from 'react';
import './clientHome.css'; // External CSS for workout summary

const WorkoutSummary = () => {
  return (
    <div className="summary">
      <div className='topspace'> </div>
      <div className="flex-container-summary" id="row1">
        <div>Calories burnt today</div>
        <div>Streak</div>
      </div>
      <div className="flex-container-summary" id="row2">
        <div>Total Time</div>
        <div>Total Duration</div>
        <div>Total calories burnt this week</div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
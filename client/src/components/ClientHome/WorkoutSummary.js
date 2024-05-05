import React from 'react';
import './ClientHome.css'; // External CSS for workout summary

const WorkoutSummary = () => {
  return (
    <div className="summary" data-testid="workout-summary">
      <div className='topspace'> </div>
      <div className="flex-container-summary" id="row1">
        <div className='smallDiv'>
            <div id='zeroes'>0</div>
            <div>Calories burnt today</div>
        </div>
        <div className='smallDiv'>
            <div id='zeroes'>0</div>
            <div>Streak</div>
        </div>
      </div>
      <div className="flex-container-summary" id="row2">
        <div className='smallDiv'>
            <div id='zeroes'>0</div>
            <div>Total Time</div>
        </div>
        <div className='smallDiv'>
            <div id='zeroes'>0</div>
            <div>Total Duration</div>
        </div>
        <div className='smallDiv'>
            <div id='zeroes'>0</div>
            <div>Total calories burnt this week</div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
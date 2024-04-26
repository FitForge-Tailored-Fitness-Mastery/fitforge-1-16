import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import './clientHome.css'; // External CSS for upcoming workouts

const UpcomingWorkouts = () => {
  return (
    <div className="upcomingWorkout" data-testid="upcoming-workouts">
      <div className="uw-heading">
      <FontAwesomeIcon icon={faCalendar} />  Upcoming Workouts
      </div>

      <div className="flex-upcoming-workout-container">
        <div className="flex-container-workout">
          <div className="column1">
            <img src="tom.jpg" alt="TrainerImage" />
          </div>
          <div className="column2">
            <div className="row1">Training with Tom</div>
            <div className="row2">Time & Day</div>
          </div>
        </div>

        <div className="flex-container-workout">
          <div className="column1">
            <img src="tom.jpg" alt="TrainerImage" />
          </div>
          <div className="column2">
            <div className="row1">Training with Tom</div>
            <div className="row2">Time & Day</div>
          </div>
        </div>

        <div className="flex-container-workout">
          <div className="column1">
            <img src="tom.jpg" alt="TrainerImage" />
          </div>
          <div className="column2">
            <div className="row1">Training with Tom</div>
            <div className="row2">Time & Day</div>
          </div>
        </div>

        <div className='bottomspace'> </div>
      </div>
    </div>
  );
};

export default UpcomingWorkouts;
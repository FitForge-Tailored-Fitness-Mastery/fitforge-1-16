import React from 'react';
import Navigation from '../NavigationBar/NavigationBar';
import '../ClientHome/ClientHome.css'; // Import associated styles for navbar
import '../WorkoutHistory/WorkoutHistory.css'; // Import associated styles

const WorkoutHistory = () => {
    return (
        <div className="workout-history">
            

            <div className="history-title"> Workout History </div>

            <div className="flex-workout-history-day-container">
                    <div id="dayDate-heading" className="flex-heading">
                        <i className="fas fa-calendar"></i> <b>Wednesday, Aug 22</b>
                    </div>

                    <div id="workhist1" className="flex-container-workouthistory">
                        <div className="column1">
                            <img src="target.png" alt="" />
                        </div>
                        <div className="column2">
                            <div className="row1"> Cardio </div>
                            <div className="row2">Time - Duration</div>
                        </div>
                    </div>

                    <div id="workhist2" className="flex-container-workouthistory">
                        <div className="column1">
                            <img src="target.png" alt="" />
                        </div>
                        <div className="column2">
                            <div className="row1"> Yoga </div>
                            <div className="row2">Time - Duration</div>
                        </div>
                    </div>
            </div>

            <div className="flex-workout-history-day-container">
                    <div id="dayDate-heading" className="flex-heading">
                        <i className="fas fa-calendar"></i> <b>Tuesday, Aug 21</b>
                    </div>

                    <div id="workhist1" className="flex-container-workouthistory">
                        <div className="column1">
                            <img src="target.png" alt="" />
                        </div>
                        <div className="column2">
                            <div className="row1"> Cardio </div>
                            <div className="row2">Time - Duration</div>
                        </div>
                    </div>

                    <div id="workhist2" className="flex-container-workouthistory">
                        <div className="column1">
                            <img src="target.png" alt="" />
                        </div>
                        <div className="column2">
                            <div className="row1"> HIIT </div>
                            <div className="row2">Time - Duration</div>
                        </div>
                    </div>
            </div>

            {/* Add Navigation Bar */}
            <Navigation />

        </div>
    );
};

export default WorkoutHistory;

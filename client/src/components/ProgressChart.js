import React from 'react';
import './clientHome.css'; 

const ProgressChart = () => {
  return (
    <div className="chart" data-testid="progress-chart">
      <img id='graph' src="graph.jpg" alt="chartImage" />
    </div>
  );
};

export default ProgressChart;

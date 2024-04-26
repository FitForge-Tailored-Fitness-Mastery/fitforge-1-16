import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'; // Mock axios for testing

import Login from '../components/Login/Login';

jest.mock('axios');


import Index from '../components/Index';

describe('Index component', () => {
  test('renders child components', () => {
    render(
        <Router>
          <Index />
        </Router>
      );
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('workout-summary')).toBeInTheDocument();
    expect(screen.getByTestId('progress-chart')).toBeInTheDocument();
    expect(screen.getByTestId('upcoming-workouts')).toBeInTheDocument();
  });
});

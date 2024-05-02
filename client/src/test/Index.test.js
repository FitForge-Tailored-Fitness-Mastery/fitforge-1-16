import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');


import Index from '../components/Index/Index';

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

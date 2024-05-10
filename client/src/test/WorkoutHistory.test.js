import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import WorkoutHistory from '../components/WorkoutHistory/WorkoutHistory';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

jest.mock('axios');

describe('WorkoutHistory', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('displays loading state initially', async () => {
    const tree = renderer.create(<BrowserRouter><WorkoutHistory /></BrowserRouter>).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('displays message when no workout history is found', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<BrowserRouter><WorkoutHistory /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('Workout History')).toBeInTheDocument();
      expect(screen.getByText('No workout history found.')).toBeInTheDocument();
    });
  });
});

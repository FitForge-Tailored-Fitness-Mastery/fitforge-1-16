import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../components/Profile/Profile';

// Mock the fetch function to return test data
const mockFetchResponse = {
  ok: true,
  json: jest.fn().mockResolvedValue({
    fname: 'John',
    lname: 'Doe',
    height: 180,
    dob: '1990-01-01',
    weight: 75,
    trainer_id: 1,
  }),
};
global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders profile details correctly', async () => {
    await act(async () => {
      render(
        <Router>
          <Profile clientId="1" />
        </Router>
      );
    });

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByAltText('User')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('180 cm')).toBeInTheDocument();
      expect(screen.getByText('33')).toBeInTheDocument(); // Calculated age
      expect(screen.getByText('75 lb')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'My Trainer >' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Logout >' })).toBeInTheDocument();
    });
  });

  test('renders error message when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    await act(async () => {
      render(
        <Router>
          <Profile clientId="1" />
        </Router>
      );
    });

    // Wait for the error to be rendered
    await waitFor(() => {
      expect(screen.getByText('Failed to load client data')).toBeInTheDocument();
    });
  });

  test('shows logout confirmation dialog when Logout button is clicked', async () => {
    await act(async () => {
      render(
        <Router>
          <Profile clientId="1" />
        </Router>
      );
    });

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.queryByText('Going so soon?')).not.toBeInTheDocument();
      expect(screen.queryByText('Are you sure you want to Logout?')).not.toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: 'Logout >' });
    fireEvent.click(logoutButton);

    // Logout confirmation dialog should be rendered
    expect(screen.getByText('Going so soon?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to Logout?')).toBeInTheDocument();
  });
});
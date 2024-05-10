import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../components/Profile/Profile';
import { BrowserRouter } from 'react-router-dom'; // Add this import
import renderer from 'react-test-renderer';

// Mock fetch
global.fetch = jest.fn();

describe('Profile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', async () => {
    const tree = renderer.create(<BrowserRouter><Profile /></BrowserRouter>).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('displays the client details when fetching is successful', async () => {
    const mockClientData = {
      fname: 'John',
      lname: 'Doe',
      height: 180,
      weight: 160,
      dob: '1990-01-01',
      trainer_id: '456',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockClientData,
    });

    render(
      <BrowserRouter> {/* Wrap the component with BrowserRouter */}
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('180 cm')).toBeInTheDocument();
      expect(screen.getByText('34')).toBeInTheDocument(); // Assuming current year is 2024
      expect(screen.getByText('160 lb')).toBeInTheDocument();
    });
  });

  it('displays an error message when the fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <BrowserRouter> {/* Wrap the component with BrowserRouter */}
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to load client data')).toBeInTheDocument();
    });
  });
});

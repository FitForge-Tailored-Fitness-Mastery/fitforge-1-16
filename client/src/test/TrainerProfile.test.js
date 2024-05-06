import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrainerProfile from '../components/TrainerProfile/TrainerProfile';
import { useParams } from 'react-router-dom';

// Mock useParams to simulate router parameter
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('TrainerProfile', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    useParams.mockReturnValue({ clientId: '123' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('displays loading state initially', () => {
    render(<TrainerProfile />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the trainer details when fetching is successful', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        imageUrl: 'http://example.com/image.jpg',
        fname: 'John',
        lname: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      }),
    });

    render(<TrainerProfile />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument();
      expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'http://example.com/image.jpg');
    });
  });

  it('displays an error message when the fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<TrainerProfile />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});

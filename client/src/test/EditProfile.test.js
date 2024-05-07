import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProfile from '../components/Profile/EditProfile';
import { BrowserRouter } from 'react-router-dom';

// Correctly setting up mocks for useParams and useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    clientId: '123'  // Ensure this returns an object with clientId
  }),
  useNavigate: () => mockedNavigate,
}));

// Mock for fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ fname: 'John', lname: 'Doe', height: '180', dob: '1990-01-01', weight: '180' }),
    ok: true,
  })
);

describe('EditProfile', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockedNavigate.mockClear();
  });

  test('renders all form fields and a submit button', () => {
    render(<BrowserRouter><EditProfile /></BrowserRouter>);
    const firstNameInput = screen.getByLabelText('First Name:');
    const lastNameInput = screen.getByLabelText('Last Name:');
    const heightInput = screen.getByLabelText('Height (cm):');
    const dobInput = screen.getByLabelText('Date of Birth:');
    const weightInput = screen.getByLabelText('Weight (lb):');
    const submitButton = screen.getByRole('button', { name: 'Save Changes' });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
    expect(dobInput).toBeInTheDocument();
    expect(weightInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('fills out and submits the form', async () => {
    render(<BrowserRouter><EditProfile /></BrowserRouter>);

    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    const submitButton = screen.getByRole('button', { name: 'Save Changes' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ fname: 'Jane', lname: '', height: '', dob: '', weight: '' }),
      }));
      expect(mockedNavigate).toHaveBeenCalledWith('/profile');
    });
  });

  test('handles fetch errors gracefully', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));
    render(<BrowserRouter><EditProfile /></BrowserRouter>);
    const submitButton = screen.getByRole('button', { name: 'Save Changes' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Failed to update data: Network Error');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

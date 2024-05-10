import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProfile from '../components/Profile/EditProfile';
import { BrowserRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const mockedNavigate = jest.fn();
// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
}));

describe('EditProfile', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    useParams.mockReturnValue({ clientId: '123' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('displays loading state initially', async () => {
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
    const { asFragment } = render(<BrowserRouter><EditProfile /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders all form fields and a submit button', async () => {
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
    render(<BrowserRouter><EditProfile /></BrowserRouter>);

    // Simulate loading data
    await waitFor(() => {
      expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Height (cm):')).toBeInTheDocument();
      expect(screen.getByLabelText('Date of Birth:')).toBeInTheDocument();
      expect(screen.getByLabelText('Weight (lb):')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });
  });

  test('fills out and submits the form', async () => {
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
    render(<BrowserRouter><EditProfile /></BrowserRouter>);

    await waitFor(() => {
      const firstNameInput = screen.getByLabelText('First Name:');
      fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

      const submitButton = screen.getByRole('button', { name: 'Save Changes' });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'PATCH',
        body: "{\"fname\":\"Jane\",\"lname\":\"Doe\"}",
        headers: {'Content-Type': 'application/json'},
      }));
    })
  });
});

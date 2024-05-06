import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import axios from 'axios'; // Mock axios for testing

import Signup from '../components/Signup/Signup';

jest.mock('axios');

describe('Signup component', () => {
  test('renders sign-up form', () => {
    render(<Signup />);

    expect(screen.getByText('FitForge')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('updates form data on input change', () => {
    render(<Signup />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  test('submits sign-up form', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'User created successfully' } });

    render(<Signup />);

    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    await act(async () => {
      fireEvent.click(signUpButton);
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for promises to resolve
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/signup', {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutConfirmationDialog from '../components/Profile/LogoutConfirmationDialog';
import { BrowserRouter } from 'react-router-dom';

describe('LogoutConfirmationDialog', () => {
  test('renders the dialog with correct content', () => {
    render(<BrowserRouter><LogoutConfirmationDialog onClose={jest.fn()} onConfirm={jest.fn()} /></BrowserRouter>);

    const heading = screen.getByRole('heading', { name: 'Going so soon?' });
    const message = screen.getByText('Are you sure you want to Logout?');
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const confirmButton = screen.getByRole('button', { name: 'Yes' });

    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  test('calls onClose when Cancel button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<BrowserRouter><LogoutConfirmationDialog onClose={onCloseMock} onConfirm={jest.fn()} /></BrowserRouter>);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when Yes button is clicked', () => {
    const onConfirmMock = jest.fn();
    render(<BrowserRouter><LogoutConfirmationDialog onClose={jest.fn()} onConfirm={onConfirmMock} /></BrowserRouter>);

    const confirmButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
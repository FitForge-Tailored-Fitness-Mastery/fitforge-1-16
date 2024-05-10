import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');


// Mocking localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();

// Mocking localStorage globally
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


import Index from '../components/Index/Index';

describe('Index component', () => {
  test('renders child components', () => {
    localStorageMock.getItem.mockReturnValue('123');
    render(
        <Router>
          <Index />
        </Router>
      );
  });
});

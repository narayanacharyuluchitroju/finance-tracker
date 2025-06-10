import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ required for matchers like toBeInTheDocument
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const heading = screen.getByText(/welcome/i);
  expect(heading).toBeInTheDocument();
});

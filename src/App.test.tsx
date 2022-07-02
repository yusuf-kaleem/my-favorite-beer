import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Favorite Beer header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Favorite Beerss/i);
  expect(linkElement).toBeInTheDocument();
});

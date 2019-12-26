import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LandingPage from './LandingPage';
import App from '../../App';

test('renders Start Now! text', () => {
  const { getByText } = render(<LandingPage />);
  const linkElement = getByText(/Start Now!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Problem1 page', () => {
  const { getByText, container } = render(<App />);
  fireEvent.click(getByText(/Start Now!/i));
  expect(container.innerHTML).toMatch('Problem #1');
});

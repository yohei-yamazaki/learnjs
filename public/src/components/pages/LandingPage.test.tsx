import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage';

test('renders Start Now! text', () => {
  const { getByText } = render(<LandingPage />);
  const linkElement = getByText(/Start Now!/i);
  expect(linkElement).toBeInTheDocument();
});

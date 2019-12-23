import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('render Problem view', () => {
  const { container, getByText } = render(<App />);
  fireEvent.click(getByText(/Start Now!/i));
  expect(container.innerHTML).toMatch('Coming soon!');
});

import React from 'react';
import { render } from '@testing-library/react';
import { createHashHistory } from 'history';
import App from './App';

test('render landing page when there is no hash', () => {
  const history = createHashHistory();
  render(
    <App />,
  );
  expect(history.location.pathname).toBe('/');
});

test('render Problem view with Problem Id', () => {
  const history = createHashHistory();
  history.push('/problem/5');
  const { getByText } = render(
    <App />,
  );
  const ProblemNumber = getByText(/Problem:5/i);
  expect(ProblemNumber).toBeInTheDocument();
});

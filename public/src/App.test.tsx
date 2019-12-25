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

test('render Problem view', () => {
  const history = createHashHistory();
  history.push('/problem');
  const { container } = render(
    <App />,
  );
  expect(container.innerHTML).toMatch('Coming soon!');
});

import React from 'react';
import { render } from '@testing-library/react';
import { createHashHistory } from 'history';
import App from './App';

test('render Problem view', () => {
  const history = createHashHistory();
  history.push('/problem');
  const { container } = render(
    <App />,
  );
  expect(container.innerHTML).toMatch('Coming soon!');
});

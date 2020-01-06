import React from 'react';
import './App.css';
import Routing from './components/Routing';
import Provider from './components/reducer/user';

const App: React.FC = () => {
  return (
    <Provider>
      <Routing />
    </Provider>
  );
};

export default (App);

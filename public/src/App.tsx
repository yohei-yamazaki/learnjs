import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './components/pages/LandingPage';
import ProblemPage from './components/pages/ProblemPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/problem/:id" component={ProblemPage} />
        <Route extact strict sensitive path="/" component={LandingPage} />
      </Switch>
    </HashRouter>
  );
};

export default App;

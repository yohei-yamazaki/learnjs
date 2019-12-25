import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './components/pages/LandingPage';

const ProblemPage: React.FC = () => <h1>Coming soon!</h1>;

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/problem" component={ProblemPage} />
        <Route extact strict sensitive path="/" component={LandingPage} />
      </Switch>
    </HashRouter>
  );
};

export default App;

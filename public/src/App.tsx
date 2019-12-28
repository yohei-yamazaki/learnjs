import React from 'react';
import { Switch, Route, HashRouter, NavLink } from 'react-router-dom';
import './App.css';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import LandingPage from './components/pages/LandingPage';
import ProblemPage from './components/pages/ProblemPage';

const App: React.FC = () => {
  const problemCategories = [
    { id: '1', title: 'Truthy' },
    { id: '2', title: 'Caluculate' },
  ];

  return (
    <HashRouter>
      <Menu borderless>
        <Menu.Item header><Header as="h1">LearnJS</Header></Menu.Item>
        <Menu.Item as={NavLink} exact to="/">Landing</Menu.Item>
        <Dropdown item text="Problems">
          <Dropdown.Menu>
            {problemCategories.map((problemCategory) => {
              return (
                <Dropdown.Item as={NavLink} key={problemCategory.id} exact to={`/problem/${problemCategory.id}`}>{problemCategory.title}</Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <Switch>
        <Route path="/problem/:id" component={ProblemPage} />
        <Route extact strict sensitive path="/" component={LandingPage} />
      </Switch>
    </HashRouter>
  );
};

export default App;

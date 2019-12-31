import React from 'react';
import { Switch, Route, HashRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import LandingPage from './pages/LandingPage';
import ProblemPage from './pages/ProblemPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

type Props = {
  user: any
}

const Routing: React.FC<Props> = (props) => {
  const { user } = props;
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
        <Menu.Menu position="right">
          {user
            ? (<Menu.Item onClick={() => Auth.signOut()}>Sign Out</Menu.Item>)
            : (<Menu.Item as={NavLink} exact to="/signin">Sign In</Menu.Item>)}
        </Menu.Menu>
      </Menu>
      <Switch>
        <Route path="/problem/:id" component={ProblemPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route extact strict sensitive path="/" component={LandingPage} />
      </Switch>
    </HashRouter>
  );
};

export default Routing;

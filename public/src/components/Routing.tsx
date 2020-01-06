import React, { useEffect, useState } from 'react';
import { Switch, Route, HashRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Loader } from 'semantic-ui-react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';
import LandingPage from './pages/LandingPage';
import ProblemPage from './pages/ProblemPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useGlobalState } from './reducer/user';

Amplify.configure(awsconfig);

type Props = {}

const Routing: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const user = useGlobalState('user');
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      // eslint-disable-next-line
      switch (event) {
        case 'signIn':
          dispatch({ type: 'SET_USER', payload: data });
          console.log(`signed in${user}`);
          break;
        case 'signOut':
          dispatch({ type: 'SET_USER', payload: null });
          console.log('Not signed in');
          break;
      }
    });
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        dispatch({ type: 'SET_USER', payload: currentUser });
        console.log(currentUser);
      })
      .catch(() => console.log('Not signed in'));
  }, []);
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
            ? (
              <>
                <Menu.Item as={NavLink} exact to="/profile">Profile</Menu.Item>
                <Menu.Item onClick={() => Auth.signOut()}>Sign Out</Menu.Item>
              </>
            )
            : (<Menu.Item as={NavLink} exact to="/signin">Sign In</Menu.Item>)}
        </Menu.Menu>
      </Menu>
      <Switch>
        <Route path="/problem/:id" component={ProblemPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route extact strict sensitive path="/" component={LandingPage} />
      </Switch>
    </HashRouter>
  );
};

export default Routing;

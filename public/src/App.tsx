import React, { useState, useEffect } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import './App.css';
import awsconfig from './aws-exports';
import Routing from './components/Routing';

Amplify.configure(awsconfig);

const App: React.FC = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        default:
          setUser(null);
          break;
      }
    });
    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log('Not signed in'));
  }, []);
  return (
    <Routing user={user} />
  );
};

export default (App);

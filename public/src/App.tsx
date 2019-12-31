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
      // eslint-disable-next-line
      switch (event) {
        case 'signIn':
          setUser(data);
          console.log('signed in');
          break;
        case 'signOut':
          setUser(null);
          console.log('Not signed in');
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

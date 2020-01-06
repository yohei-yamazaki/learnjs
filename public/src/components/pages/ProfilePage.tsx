import React from 'react';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useGlobalState } from '../reducer/user';

const ProfilePage: React.FC<RouteComponentProps> = () => {
  const user = useGlobalState('user');
  if (!user) return <Loader />;
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">User Profile</Header>
            <Header as="h4">{user.attributes.email}</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default ProfilePage;

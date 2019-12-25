import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps;

const LandingPage: React.FC<Props> = (props) => {
  const { history } = props;
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8} verticalAlign="bottom">
            <Header as="h2">Learn JavaScript, one puzzle at a time.</Header>
            <Button onClick={() => { history.push('/problem'); }}>Start Now!</Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <img src="../../../logo512.png" alt="logo" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default LandingPage;

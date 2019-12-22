import React from "react";
import { Button, Container, Grid, Header } from "semantic-ui-react";

type Props = {};

const LandingPage: React.FC<Props> = () => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8} verticalAlign="bottom">
            <Header as="h2">Learn JavaScript, one puzzle at a time.</Header>
            <Button>Learn React</Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <img src="../../../logo512.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default LandingPage;

import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';

type Props = {} & RouteComponentProps<{id: string}>;

const ProblemPage: React.FC<Props> = (props) => {
  const { match } = props;
  const { id } = match.params;
  console.log(match.params);

  return (
    <Container>
      <Header as="h1">{`Problem:${id}`}</Header>
    </Container>
  );
};

export default ProblemPage;

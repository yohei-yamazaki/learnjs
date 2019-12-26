import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import ProblemTitle from '../atoms/ProblemTitle';

type Props = {} & RouteComponentProps<{id: string}>;

const ProblemPage: React.FC<Props> = (props) => {
  const { match } = props;
  const { id } = match.params;
  return (
    <Container>
      <ProblemTitle problemNumber={id} />
    </Container>
  );
};

export default ProblemPage;

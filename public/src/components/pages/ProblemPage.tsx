import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import ProblemTitle from '../atoms/ProblemTitle';

const problems: {id: string, description: string, code: string}[] = [
  {
    id: '1',
    description: 'What is truth?',
    code: 'const truthy = () => { return __; }',
  },
  {
    id: '2',
    description: 'Simple Math',
    code: 'const simpleMath = () => { return 42 === 6 * __; }',
  },
];

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

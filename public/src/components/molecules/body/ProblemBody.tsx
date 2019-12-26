import React from 'react';
import { Header } from 'semantic-ui-react';
import { Problem } from '../../pages/ProblemPage';

type Props = {
  problem: Problem
}

const ProblemBody: React.FC<Props> = (props) => {
  const { problem } = props;
  return (
    <div>
      <Header as="h3">{problem.description}</Header>
      <pre>{problem.code}</pre>
    </div>
  );
};

export default ProblemBody;

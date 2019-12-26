import React from 'react';
import { Header } from 'semantic-ui-react';

type Props = {
  problemNumber:string
}

const ProblemTitle: React.FC<Props> = (props) => {
  const { problemNumber } = props;
  return (
    <Header as="h1">{`Problem #${problemNumber}`}</Header>
  );
};

export default ProblemTitle;

import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import ProblemTitle from '../atoms/titles/ProblemTitle';
import ProblemBody from '../molecules/body/ProblemBody';


export type Problem = {
 id: string,
 description: string,
 code: string
}

const problems: Problem[] = [
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
  const [problem, setProblem] = useState<Problem | null>(null);
  const { match } = props;
  const { id } = match.params;
  useEffect(() => {
    setProblem(problems.find((item) => item.id === id) ?? null);
  }, [id]);
  return (
    <Container>
      <ProblemTitle problemNumber={id} />
      {problem
        ? <ProblemBody problem={problem} />
        : null}
    </Container>
  );
};

export default ProblemPage;

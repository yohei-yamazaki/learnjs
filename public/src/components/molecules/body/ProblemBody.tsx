import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Problem } from '../../pages/ProblemPage';

type Props = {
  problem: Problem
}

const CodeContainer = styled.div`
  background-color: lightgrey;
  padding: 16px;
`;

const ProblemBody: React.FC<Props> = (props) => {
  const { problem } = props;
  return (
    <div>
      <Header as="h3">{problem.description}</Header>
      <CodeContainer>
        <pre><code>{problem.code}</code></pre>
      </CodeContainer>
    </div>
  );
};

export default ProblemBody;

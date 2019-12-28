import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useFormik, FormikErrors } from 'formik';
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

type Answer = {
  answer: string
}

type Props = {} & RouteComponentProps<{id: string}>;

const ProblemPage: React.FC<Props> = (props) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [checkAnswer, setCheckAnswer] = useState('');
  const { match } = props;
  const { id } = match.params;
  useEffect(() => {
    setProblem(problems.find((item) => item.id === id) ?? null);
  }, [id]);

  const onCheckAnswer = async (values: Answer) => {
    if (values.answer === 'true') {
      return 'Correct!';
    }
    return 'Wrong';
  };

  const formik = useFormik<Answer>({
    initialValues: {
      answer: '',
    },
    onSubmit: async (values) => {
      setCheckAnswer('');
      const check = await onCheckAnswer(values);
      setCheckAnswer(check);
    },
    validateOnChange: false,
    validate: (value) => {
      const errors: FormikErrors<Answer> = {};
      const { answer } = value;
      if (!answer) {
        errors.answer = 'required';
      }
      return errors;
    },

  });
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

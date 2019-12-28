import React, { useEffect, useState } from 'react';
import { Container, Input, Button, Form, Transition, Header } from 'semantic-ui-react';
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
  const [loading, setLoading] = useState(false);
  const { match, history } = props;
  const { id } = match.params;

  const onCheckAnswer = async (values: Answer) => {
    if (values.answer === 'true') return 'Correct!';
    return 'Wrong';
  };


  const formik = useFormik<Answer>({
    initialValues: {
      answer: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const check = await onCheckAnswer(values);
      setCheckAnswer(check);
      setLoading(false);
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

  useEffect(() => {
    setProblem(problems.find((item) => item.id === id) ?? null);
    setCheckAnswer('');
    formik.resetForm({});
  }, [id]);

  return (
    <Container>
      <ProblemTitle problemNumber={id} />
      {problem
        ? <ProblemBody problem={problem} />
        : null}
      <Form>
        <Form.Field error={formik.errors.answer} value={formik.values.answer} control={Input} onChange={formik.handleChange('answer') as () => {}} />
        <Form.Field control={Button} onClick={formik.handleSubmit as () => {}}>
          CHECK ANSWER
        </Form.Field>
        <Transition visible={!loading} animation="scale" duration={500}>
          <Header color={checkAnswer === 'Correct!' ? 'blue' : 'red'} as="h3">{checkAnswer}</Header>
        </Transition>
        {checkAnswer === 'Correct!' && (
        <Button onClick={() => {
          history.push(`${Number(id) + 1}`);
        }}
        >
          Next Problem!
        </Button>
        )}
      </Form>
    </Container>
  );
};

export default ProblemPage;

import React, { useState } from 'react';
import { Container, Input, Button, Form, Loader } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useFormik, FormikErrors } from 'formik';
import { Auth } from 'aws-amplify';

type SignUpValues = {
  email: string
  password: string
  confirmPassword: string
}

type Props = {} & RouteComponentProps;

const SignUpPage: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const { history } = props;

  const formik = useFormik<SignUpValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      await Auth.signUp({ username: email, password });
      setLoading(false);
    },
    validate: (value) => {
      const errors: FormikErrors<SignUpValues> = {};
      const { email, password, confirmPassword } = value;
      if (!email) {
        errors.email = '必須';
      }
      if (!password) {
        errors.password = '必須';
      }
      if (password.length < 8) {
        errors.password = 'パスワードは８文字以上です。';
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = 'パスワードと同じ文字を入力してください。';
      }
      return errors;
    },
  });

  return (
    <>
      <Container>
        <Form>
          <Form.Field label="Email" error={formik.errors.email} value={formik.values.email} control={Input} onChange={formik.handleChange('email') as () => {}} />
          <Form.Field label="password" error={formik.errors.password} value={formik.values.password} control={Input} type="password" onChange={formik.handleChange('password') as () => {}} />
          <Form.Field label="confirmPassword" error={formik.errors.confirmPassword} value={formik.values.confirmPassword} control={Input} type="password" onChange={formik.handleChange('confirmPassword') as () => {}} />
          <Form.Field control={Button} onClick={formik.handleSubmit as () => {}}>
          登録する
          </Form.Field>
        </Form>
      </Container>
      { loading && <Loader content="Loading" />}
    </>
  );
};

export default SignUpPage;

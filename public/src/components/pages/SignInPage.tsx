import React, { useState } from 'react';
import { Container, Input, Button, Form, Loader, Icon } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useFormik, FormikErrors } from 'formik';
import { Auth } from 'aws-amplify';
import SocialLoginButton from '../atoms/Buttons/SocialLoginButton';

export enum CognitoHostedUIIdentityProvider {
    Cognito = 'COGNITO',
    Google = 'Google',
    Facebook = 'Facebook',
    Amazon = 'LoginWithAmazon',
}

type SignUpValues = {
  email: string
  password: string
}

type Props = {} & RouteComponentProps;

const SignInPage: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const { history } = props;

  const formik = useFormik<SignUpValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      await Auth.signIn({ username: email, password });
      setLoading(false);
      history.push('/landing');
    },
    validate: (value) => {
      const errors: FormikErrors<SignUpValues> = {};
      const { email, password } = value;
      if (!email) {
        errors.email = '必須';
      }
      if (!password) {
        errors.password = '必須';
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
          <Form.Field control={Button} onClick={formik.handleSubmit as () => {}}>
          ログインする
          </Form.Field>
        </Form>
        <Button onClick={() => history.push('/signup')}>新規登録へ</Button>
        <Button color="google plus" onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
          <Icon name="google plus" />
          Google+
        </Button>
        <Button color="facebook" onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}>
          <Icon name="facebook" />
          facebook
        </Button>

        {/* <SocialLoginButton /> */}
      </Container>
      { loading && <Loader content="Loading" />}
    </>
  );
};

export default SignInPage;

import React, {useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { signIn } from '../share/HttpCall';

const Login = () => {

  const [userData, setUserData] = useState({});
  const history = useHistory();

  const onChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = async () => {
    console.log(userData);
    if (!userData.email || !userData.password) {
      toast('required all fields', { type: 'error' });
    } else {
      const res = await signIn({ url: '/api/auth/login', data: userData });
      if (res) {
        history.push('/home');
      }
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log in to your account
      </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address'
              name='email'
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              onChange={onChange}
            />

            <Button onClick={onSubmit} color='teal' fluid size='large'>
              Login
          </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/register'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { signIn } from '../share/HttpCall';

const Register = (props) => {
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
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      toast('required all fields', { type: 'error' });
    } else {
      const res = await signIn({ url: '/api/auth/register', data: userData });
      if (res) {
        history.push('/home');
      }
    }
  }


  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Register your account
      </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='First Name'
              name='firstName'
              onChange={onChange}
            />
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='Last Name'
              name='lastName'
              onChange={onChange}
            />
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

            <Button color='teal' onClick={onSubmit} fluid size='large'>
              Register
          </Button>
          </Segment>
        </Form>
        <Message>
          Already Register? <a href='/'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
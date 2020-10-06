import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import FormContainer from '../Layouts/FormContainer';
import { login } from '../../actions/userActions';
const LoginScreen = ({ location }) => {
  const [email, setEmal] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer{' '}
          <Link to={redirect ? `register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import FormContainer from '../Layouts/FormContainer';
import { login } from '../../actions/userActions';
const LoginScreen = () => {
  const [email, setEmal] = useState('');
  const [password, setPassword] = useState('');
  return (
    <FormContainer>
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
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;

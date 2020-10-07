import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import { register, loadUser, updateUser } from '../../actions/userActions';
import { setAlert } from '../../actions/alertActions';
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userLoginRegister = useSelector((state) => state.userLoginRegister);
  const alert = useSelector((state) => state.alert);
  const { userInfo, isAuthenticated, loading } = userLoginRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setAlert('Passwords Do Not Match', 'danger'));
    } else {
      dispatch(updateUser(name, email, password));
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    } else {
      if (!userInfo.name) {
        dispatch(loadUser());
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        dispatch(setAlert('Profile Succesfully Updated', 'success'));
      }
    }
  }, [history, isAuthenticated, dispatch]);
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {alert &&
          alert.map((x) => (
            <Message key={x.id} variant={x.alertType}>
              {x.msg}
            </Message>
          ))}
        {loading && <Spinner />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update User
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;

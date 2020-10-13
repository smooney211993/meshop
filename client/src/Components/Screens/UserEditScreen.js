import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import FormContainer from '../Layouts/FormContainer';
import {
  getUserDetailsAsAdmin,
  updateUserAsAdmin,
} from '../../actions/userActions';
import { setAlert } from '../../actions/alertActions';
import { USER_UPDATE_RESET_ADMIN } from '../../actions/types';

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: adminLoading, error: adminError, success } = useSelector(
    (state) => state.userUpdateAdmin
  );
  const { loading, error, user } = userDetails;
  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET_ADMIN });
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetailsAsAdmin(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user, success, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      isAdmin,
    };
    dispatch(updateUserAsAdmin(body, userId));
    dispatch(setAlert('User Successfully Updated', 'Success'));
  };
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {adminError && <Message variant='danger'>{adminError.msg}</Message>}
        {alert &&
          alert.map((x) => (
            <Message key={x.id} variant={x.alertType}>
              {x.msg}
            </Message>
          ))}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant='danger'>{error.msg}</Message>
        ) : (
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
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

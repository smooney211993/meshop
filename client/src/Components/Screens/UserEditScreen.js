import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import FormContainer from '../Layouts/FormContainer';
import { getUserDetailsAsAdmin } from '../../actions/userActions';
import { setAlert } from '../../actions/alertActions';

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetailsAsAdmin(userId));
  }, [dispatch, userId]);

  return <div>hello</div>;
};

export default UserEditScreen;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import { userListAsAdmin } from '../../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(userListAsAdmin());
  }, [dispatch]);
  const { loading, users, error } = userList;
  return (
    <>
      <h1>Users</h1>
    </>
  );
};

export default UserListScreen;

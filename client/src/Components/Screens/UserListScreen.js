import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import { userListAsAdmin, userDeleteAsAdmin } from '../../actions/userActions';
import { USER_DELETE_RESET } from '../../actions/types';
import { setAlert } from '../../actions/alertActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;
  const userLogin = useSelector((state) => state.userLoginRegister);
  const { userInfo } = userLogin;
  const { success } = useSelector((state) => state.userDelete);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    dispatch({ type: USER_DELETE_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListAsAdmin());
    } else {
      history.push('/');
    }
  }, [dispatch, history, success, userInfo]);
  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure. This Action Can Not Be Undone')) {
      dispatch(userDeleteAsAdmin(id));
      dispatch(setAlert('User Successfully Deleted', 'success'));
    }
  };
  return (
    <>
      <h1>Users</h1>
      {alert.length > 0 &&
        alert.map((x) => (
          <Message key={x.id} variant={x.alerType}>
            {x.msg}
          </Message>
        ))}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error.msg}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users !== null &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto: ${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;

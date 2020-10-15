import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import { getOrdersAsAdmin } from '../../actions/orderActions';
import { setAlert } from '../../actions/alertActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderLists = useSelector((state) => state.orderLists);
  const { loading, orders, error } = orderLists;
  const userLogin = useSelector((state) => state.userLoginRegister);
  const { userInfo } = userLogin;
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrdersAsAdmin());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);
  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure. This Action Can Not Be Undone')) {
      dispatch(userDeleteAsAdmin(id));
      dispatch(setAlert('User Successfully Deleted', 'success'));
    }
  };
  return (
    <>
      <h1>Orders</h1>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.paid}</td>
                  <td>{order.delivered}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;

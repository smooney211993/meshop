import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import { getOrdersAsAdmin } from '../../actions/orderActions';

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

  return (
    <>
      {' '}
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
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button variant='primary'>Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;

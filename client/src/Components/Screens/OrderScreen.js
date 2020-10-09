import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../actions/orderActions';
import Spinner from '../Layouts/Spinner';
import Message from '../Layouts/Message';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    _id,
    orderItems,
    loading,
    shippingAddress: { address, city, postalCode, country },
    taxPrice,
    totalPrice,
    shippingPrice,
    paymentMethod,
    name,
    email,
    error,
    isPaid,
    isDelivered,
    paidAt,
  } = orderDetails;
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      console.log(clientId);
    };
    if (_id !== orderId) {
      dispatch(getOrderById(orderId));
    }
    dispatch(getOrderById(orderId));
    addPaypalScript();
  }, [dispatch, orderId, _id]);
  return loading ? (
    <Spinner />
  ) : error ? (
    <Message variant='danger'>{error.msg}</Message>
  ) : (
    <>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Name: <strong>{name}</strong>
              </p>
              <p>
                Email{' '}
                <strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </strong>
              </p>
              <p>
                <strong>Address: </strong>
                {address}, {city} {postalCode}, {country}
              </p>
              {isDelivered ? (
                <Message variant='success'>Order Delivered</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
              {isPaid ? (
                <Message variant='success'>Paid on{paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderItems.map((item, i) => (
                    <ListGroupItem key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Items: (
                    {orderItems.reduce((acc, item) => acc + item.qty, 0)})
                  </Col>
                  <Col>
                    $
                    {orderItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>GST:</Col>
                  <Col>{taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;

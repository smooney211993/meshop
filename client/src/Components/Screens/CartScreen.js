import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../Layouts/Message';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? location.search.split('=')[1] : 1;
  console.log(qty);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return <div>hello</div>;
};

export default CartScreen;

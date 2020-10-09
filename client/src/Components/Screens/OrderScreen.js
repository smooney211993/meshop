import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../actions/orderActions';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderById(match.params.id));
  });
  return <div>hello</div>;
};

export default OrderScreen;

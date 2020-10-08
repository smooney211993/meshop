import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
} from './types';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const { data } = await axios.post('/api/orders', body, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      dispatch: { msg: error.response.data.msg, err: error.response.status },
    });
  }
};

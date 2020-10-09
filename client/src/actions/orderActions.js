import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from './types';

import axios from 'axios';

export const createOrder = (order) => async (dispatch) => {
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
      dispatch: {
        msg: error.response.data.errors[0].msg,
        err: error.response.status,
      },
    });
  }
};

export const getOrderById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: {
        msg: error.response.data.errors[0].msg,
        err: error.response.status,
      },
    });
  }
};

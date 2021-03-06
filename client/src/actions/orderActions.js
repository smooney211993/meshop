import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_DELIVER_ADMIN_REQUEST,
  ORDER_DELIVER_ADMIN_SUCCESS,
  ORDER_DELIVER_ADMIN_FAIL,
} from './types';
import { setAlert } from './alertActions';

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
    dispatch(setAlert('Order Successfully Created', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch(setAlert(errors[0].msg, 'danger'));
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      dispatch: {
        msg: error.response.statusText,
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
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const payOrder = (orderId, paymentResults) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResults,
      config
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    dispatch({ type: ORDER_CREATE_RESET });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const getMyOrderList = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const { data } = await axios.get(`/api/orders/myorders`);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const getOrdersAsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_ADMIN_REQUEST });
    const { data } = await axios.get(`/api/admin/orders`);
    dispatch({ type: ORDER_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ADMIN_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const updateOrderDeliveryStatus = (orderId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    dispatch({ type: ORDER_DELIVER_ADMIN_REQUEST });
    await axios.put(`/api/admin/orders/${orderId}/delivered`, {}, config);
    dispatch({ type: ORDER_DELIVER_ADMIN_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_ADMIN_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

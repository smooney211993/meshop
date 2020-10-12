import {
  USER_LOG_OUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOGIN_REQUEST,
  USER_LOADED_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  ORDER_LIST_MY_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from './types';
import axios from 'axios';
import { setAlert } from './alertActions';
export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post('/api/auth', body, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: {
        msg: error.response.data.errors[0].msg,
        err: error.response.status,
      },
    });
    if (error.response.data.msg) {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
  }
};

export const register = (email, name, password) => async (dispatch) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  const body = JSON.stringify({
    name,
    email,
    password,
  });
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post('/api/users', body, config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: {
        msg: error.response.data.errors[0].msg,
        err: error.response.status,
      },
    });
    if (error.response.data.msg) {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
  }
};
export const updateUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  const body = JSON.stringify({
    name,
    email,
    password,
  });
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    await axios.put('/api/users', body, config);
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: {
        msg: error.response.data.errors[0].msg,
        err: error.response.status,
      },
    });
    if (error.response.data.msg) {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
  }
};

export const userListAsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get('/api/admin/users');
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: {
        msg: error.response.data.errors[0].msg,
        err: error.response.status,
      },
    });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({ type: USER_LOG_OUT });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

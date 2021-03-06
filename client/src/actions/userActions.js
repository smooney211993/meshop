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
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST_ADMIN,
  USER_UPATE_SUCCESS_ADMIN,
  USER_UPDATE_FAIL_ADMIN,
  ORDER_CREATE_RESET,
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
        msg: error.response.statusText,
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
        msg: error.response.statusText,
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
    dispatch(setAlert('Profile Successfully Updated', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
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
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const userDeleteAsAdmin = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    await axios.delete(`/api/admin/users/${userId}`);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const getUserDetailsAsAdmin = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/admin/users/${userId}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const updateUserAsAdmin = (formData, userId) => async (dispatch) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  const body = JSON.stringify(formData);
  try {
    dispatch({ type: USER_UPDATE_REQUEST_ADMIN });
    await axios.put(`/api/admin/users/${userId}`, body, config);
    dispatch({ type: USER_UPATE_SUCCESS_ADMIN });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL_ADMIN,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};
export const logOut = () => (dispatch) => {
  dispatch({ type: USER_LOG_OUT });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: ORDER_CREATE_RESET });
};

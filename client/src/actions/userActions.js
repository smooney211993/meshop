import {
  USER_LOG_OUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOGIN_REQUEST,
  USER_LOADED_FAIL,
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
      payload: { msg: error.response.data.msg, err: error.response.status },
    });
    if (error.response.data.msg) {
      dispatch(setAlert(error.response.data.msg, 'danger'));
    }
  }
};

export const logOut = () => (dispatch) => {
  dispatch({ type: USER_LOG_OUT });
};

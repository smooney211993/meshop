import {
  USER_LOG_OUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOGIN_REQUEST,
  USER_LOADED_FAIL,
} from './types';
import axios from 'axios';
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
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { msg: error.response.statusText, err: error.response.status },
    });
  }
};

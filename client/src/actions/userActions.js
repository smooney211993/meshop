import {
  USER_LOG_OUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOADED,
} from './types';
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
  } catch (error) {}
};

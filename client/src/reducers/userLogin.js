import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOG_OUT,
  USER_LOADED,
} from '../actions/types';

const initialState = {
  userInfo: null,
  loading: null,
  error: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case USER_LOADED:
      return {
        ...state,
        userInfo: payload,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_LOG_OUT:
      return { userInfo: null, loading: null, error: null, token: null };
    default:
      return state;
  }
}

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOG_OUT,
  USER_LOADED,
  USER_LOADED_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case USER_LOADED:
      return {
        ...state,
        userInfo: payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { ...state, error: payload, loading: null };
    case USER_LOADED_FAIL:
      return {
        ...state,
        userInfo: null,
        loading: null,
        token: null,
        isAuthenticated: false,
        error: null,
      };
    case USER_LOG_OUT:
      return {
        userInfo: null,
        loading: null,
        error: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

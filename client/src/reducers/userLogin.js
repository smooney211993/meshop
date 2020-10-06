import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOG_OUT,
} from '../actions/types';

const initialState = {
  userInfo: null,
  loading: null,
  error: null,
  token: localStorage.getItem('token'),
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
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOG_OUT:
      return { userInfo: null, loading: null, error: null, token: null };
    default:
      return state;
  }
}

import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: payload, success: false };
    case USER_DELETE_RESET:
      return { loading: null, success: null, error: null };
    default:
      return state;
  }
}

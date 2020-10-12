import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
} from '../actions/types';

const initialState = {
  users: null,
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: payload, error: null };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    case USER_LIST_RESET:
      return { users: null, loading: null, error: null };
    default:
      return state;
  }
}

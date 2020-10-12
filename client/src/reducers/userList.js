import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from '../actions/types';

const initialState = {
  users: [],
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
    default:
      return state;
  }
}

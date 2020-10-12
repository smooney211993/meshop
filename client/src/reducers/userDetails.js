import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../actions/types';

const initialState = {
  user: {},
  loading: false,
  error: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: payload, error: null };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

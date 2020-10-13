import {
  USER_UPDATE_REQUEST_ADMIN,
  USER_UPATE_SUCCESS_ADMIN,
  USER_UPDATE_FAIL_ADMIN,
  USER_UPDATE_RESET_ADMIN,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_UPDATE_REQUEST_ADMIN:
      return { ...state, loading: true };
    case USER_UPATE_SUCCESS_ADMIN:
      return { ...state, loading: false, success: true, error: null };
    case USER_UPDATE_FAIL_ADMIN:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

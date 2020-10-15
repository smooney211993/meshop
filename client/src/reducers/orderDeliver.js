import {
  ORDER_DELIVER_ADMIN_REQUEST,
  ORDER_DELIVER_ADMIN_SUCCESS,
  ORDER_DELIVER_ADMIN_FAIL,
  ORDER_DELIVER_ADMIN_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case ORDER_DELIVER_ADMIN_REQUEST:
      return { ...state, loading: true };
    case ORDER_DELIVER_ADMIN_SUCCESS:
      return { ...state, loading: false, error: null, success: true };
    case ORDER_DELIVER_ADMIN_FAIL:
      return { ...state, loading: false, error: payload, success: false };
    case ORDER_DELIVER_ADMIN_RESET:
      return { loading: null, success: null, error: null };

    default:
      return state;
  }
}

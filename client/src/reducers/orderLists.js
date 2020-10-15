import {
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
} from '../actions/types';

const initialState = {
  orders: [],
  error: null,
  loading: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { ...state, loading: true };

    case ORDER_LIST_ADMIN_SUCCESS:
      return { ...state, loading: false, orders: payload, error: null };
    case ORDER_LIST_ADMIN_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

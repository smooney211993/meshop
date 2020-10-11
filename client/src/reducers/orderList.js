import {
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from '../actions/types';

const initialState = {
  loading: null,
  orderList: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { ...state, loading: false, orderList: payload, error: null };
    case ORDER_LIST_MY_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

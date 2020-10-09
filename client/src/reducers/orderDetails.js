import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
} from '../actions/types';

const initialState = {
  orderItems: null,
  shippingAddress: {},
  loading: true,
  error: null,
  taxPrice: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderItems: payload.orderItems,
        shippingAddress: payload.shippingAddress,
        loading: false,
      };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

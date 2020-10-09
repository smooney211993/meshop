import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
} from '../actions/types';

const initialState = {
  _id: null,
  orderItems: null,
  shippingAddress: {},
  loading: true,
  error: null,
  shippingPrice: null,
  taxPrice: null,
  totalPrice: null,
  isPaidAt: null,
  isDelivered: null,
  paymentMethod: null,
  paidAt: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        _id: payload._id,
        orderItems: payload.orderItems,
        shippingAddress: payload.shippingAddress,
        shippingPrice: payload.shippingPrice,
        taxPrice: payload.taxPrice,
        totalPrice: payload.totalPrice,
        isPaid: payload.isPaid,
        isDelivered: payload.isDelivered,
        paymentMethod: payload.paymentMethod,
        paidAt: payload.paidAt,
        name: payload.user.name,
        email: payload.user.email,
        loading: false,
      };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

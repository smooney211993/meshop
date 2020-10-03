import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../actions/types';
const initialState = {
  products: [],
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: payload, error: null };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

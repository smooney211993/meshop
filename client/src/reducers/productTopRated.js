import {
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../actions/types';

const initialState = {
  products: [],
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_TOP_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_TOP_SUCCESS:
      return { ...state, loading: false, products: payload };
    case PRODUCT_TOP_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
  product: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        product: payload,
      };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: payload, success: false };
    case PRODUCT_CREATE_RESET:
      return { loading: null, success: null, error: null };
    default:
      return state;
  }
}

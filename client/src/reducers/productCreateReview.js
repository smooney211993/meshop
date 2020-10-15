import {
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_FAIL,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, error: payload, success: false };
    case PRODUCT_CREATE_REVIEW_RESET:
      return { loading: null, success: null, error: null };
    default:
      return state;
  }
}

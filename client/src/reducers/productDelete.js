import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../actions/types';

const initiaState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initiaState, action) {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: payload, success: false };

    default:
      return state;
  }
}

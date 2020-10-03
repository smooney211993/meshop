import {
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_FAIL,
} from '../actions/types';

const initialState = {
  product: { reviews: [] },
  loading: null,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ITEM_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ITEM_SUCCESS:
      return { ...state, product: payload };
    case PRODUCT_ITEM_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}

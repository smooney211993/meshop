import {
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_FAIL,
  CLEAR_PRODUCT_ITEM,
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
      return {
        ...state,
        product: { ...state.product, ...payload },
        loading: false,
      };
    case PRODUCT_ITEM_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PRODUCT_ITEM:
      return { product: { reviews: [] }, loading: null, errors: {} };

    default:
      return state;
  }
}

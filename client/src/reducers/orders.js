import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  order: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_CREATE_RESET:
      return {
        loading: null,
        success: null,
        order: null,
        error: null,
      };
    default:
      return state;
  }
}

import {
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    default:
      return state;
  }
}

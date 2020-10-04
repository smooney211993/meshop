import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItem'))
  : [];
const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: {},
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (existItem) {
        return { ...state, loading: false };
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, payload],
        };
      }
    default:
      return state;
  }
}

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOADING,
} from '../actions/types';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
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
    case CART_LOADING:
      return { ...state, loading: true };
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (existItem) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, payload],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };
    default:
      return state;
  }
}

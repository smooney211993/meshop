import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOADING,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../actions/types';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const cartShippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: cartShippingAddressFromStorage,
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
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          ),
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
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, loading: false, shippingAddress: payload };
    default:
      return state;
  }
}

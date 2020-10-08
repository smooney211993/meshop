import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOADING,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../actions/types';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const cartShippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const cartPaymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';
const cartItemsPriceFromStorage = localStorage.getItem('cartItemsPrice')
  ? JSON.parse(localStorage.getItem('cartItems')).reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  : 0;
const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: cartShippingAddressFromStorage,
  loading: null,
  error: null,
  paymentMethod: cartPaymentMethodFromStorage,
  cartItemsPrice: cartItemsPriceFromStorage,
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
        const newCartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? payload : x
        );
        const newTotalPrice = newCartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );
        return {
          ...state,
          loading: false,
          cartItems: newCartItems,
          cartItemsPrice: newTotalPrice,
        };
      } else {
        const newCartItems = [...state.cartItems, payload];
        const newTotalPrice = newCartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );
        return {
          ...state,
          loading: false,
          cartItems: newCartItems,
          cartItemsPrice: newTotalPrice,
        };
      }
    case CART_REMOVE_ITEM:
      const updatedCart = state.cartItems.filter((x) => x.product !== payload);
      const updatedTotalPrice = updatedCart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      return {
        ...state,
        loading: false,
        cartItems: updatedCart,
        cartItemsPrice: updatedTotalPrice,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, loading: false, shippingAddress: payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload, loading: false };
    default:
      return state;
  }
}

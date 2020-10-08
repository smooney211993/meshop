import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOADING,
  CART_SAVE_SHIPPING_ADDRESS,
} from './types';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  dispatch({ type: CART_LOADING });
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formState) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: formState,
  });

  localStorage.setItem(
    'shippingAddress',
    JSON.stringify(getState().cart.shippingAddress)
  );
};

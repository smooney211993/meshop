import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_FAIL,
  CLEAR_PRODUCT_ITEM,
} from './types';

export const getProducts = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_ITEM });
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ITEM_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ITEM_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

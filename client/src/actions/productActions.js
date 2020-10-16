import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_FAIL,
  CLEAR_PRODUCT_ITEM,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from './types';
import { setAlert } from './alertActions';

export const getProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  dispatch({ type: CLEAR_PRODUCT_ITEM });
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
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
        err: error.response.status,
      },
    });
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await axios.delete(`/api/admin/products/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
    dispatch(setAlert('Product SuccessFully Deleted'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch(setAlert(errors[0].msg, 'danger'));
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await axios.post(`/api/admin/products/create`, {}, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    dispatch(setAlert('Product SuccessFully Created', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch(setAlert(errors.response.data.errors[0].msg, 'danger'));
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const updateProductAsAdmin = (formData, productId) => async (
  dispatch
) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  const body = JSON.stringify(formData);
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const { data } = await axios.put(
      `/api/admin/products/${productId}`,
      body,
      config
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch(setAlert('Product Successfully Updated', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch(setAlert(errors[0].msg, 'danger'));
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

export const createProductReview = (formData, productId) => async (
  dispatch
) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  const body = JSON.stringify(formData);

  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
    await axios.post(`/api/products/${productId}/reviews`, body, config);
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    dispatch(setAlert('Review Successfully Created', 'success'));
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
};

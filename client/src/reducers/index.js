import { combineReducers } from 'redux';
import productReducer from './productReducer';
import productItemReducer from './productItem';
export default combineReducers({ productReducer, productItemReducer });

import { combineReducers } from 'redux';
import productList from './productReducer';
import productItem from './productItem';
export default combineReducers({ productList, productItem });

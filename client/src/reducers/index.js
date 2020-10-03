import { combineReducers } from 'redux';
import productList from './productList';
import productItem from './productItem';
export default combineReducers({ productList, productItem });

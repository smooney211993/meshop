import { combineReducers } from 'redux';
import productList from './productList';
import productItem from './productItem';
import cart from './cart';
export default combineReducers({ productList, productItem, cart });

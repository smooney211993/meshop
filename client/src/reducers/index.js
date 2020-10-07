import { combineReducers } from 'redux';
import productList from './productList';
import productItem from './productItem';
import userLogin from './userLogin';
import alert from './alert';
import cart from './cart';
export default combineReducers({
  productList,
  productItem,
  cart,
  userLogin,
  alert,
});

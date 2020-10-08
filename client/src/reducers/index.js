import { combineReducers } from 'redux';
import productList from './productList';
import productItem from './productItem';
import userLoginRegister from './userLogin';
import order from './order';
import alert from './alert';
import cart from './cart';
export default combineReducers({
  productList,
  productItem,
  cart,
  userLoginRegister,
  alert,
  order,
});

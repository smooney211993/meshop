import { combineReducers } from 'redux';
import productList from './productList';
import productItem from './productItem';
import userLoginRegister from './userLogin';
import userList from './userList';
import userDelete from './userDelete';
import orders from './orders';
import orderDetails from './orderDetails';
import orderPay from './orderPay';
import orderList from './orderList';
import alert from './alert';
import cart from './cart';
export default combineReducers({
  productList,
  productItem,
  cart,
  userLoginRegister,
  alert,
  orders,
  orderDetails,
  orderPay,
  orderList,
  userList,
  userDelete,
});

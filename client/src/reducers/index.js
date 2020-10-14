import { combineReducers } from 'redux';
import productList from './productList';
import productItem from './productItem';
import productDelete from './productDelete';
import productCreate from './productCreate';
import productUpdate from './productUpdate';
import userLoginRegister from './userLogin';
import userList from './userList';
import userDelete from './userDelete';
import userUpdateAdmin from './userUpdateAdmin';
import userDetails from './userDetails';
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
  userDetails,
  userUpdateAdmin,
  productDelete,
  productCreate,
  productUpdate,
});

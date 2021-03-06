import { combineReducers } from 'redux';
import productTopRated from './productTopRated';
import productList from './productList';
import productItem from './productItem';
import productDelete from './productDelete';
import productCreate from './productCreate';
import productUpdate from './productUpdate';
import productCreateReview from './productCreateReview';
import userLoginRegister from './userLogin';
import userList from './userList';
import userDelete from './userDelete';
import userUpdateAdmin from './userUpdateAdmin';
import userDetails from './userDetails';
import orders from './orders';
import orderDetails from './orderDetails';
import orderDeliver from './orderDeliver';
import orderPay from './orderPay';
import orderList from './orderList';
import orderLists from './orderLists';
import alert from './alert';
import cart from './cart';
export default combineReducers({
  productList,
  productTopRated,
  productItem,
  cart,
  userLoginRegister,
  alert,
  orders,
  orderDetails,
  orderPay,
  orderList,
  orderLists,
  userList,
  userDelete,
  userDetails,
  userUpdateAdmin,
  productDelete,
  productCreate,
  productCreateReview,
  productUpdate,
  orderDeliver,
});

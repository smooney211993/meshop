const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getLoggedInUserOrders,
  getOrders,
} = require('../controllers/orderController');

router
  .route('/')
  .post(authToken, addOrderItems)
  .get(authToken, isAdmin, getOrders);
router.route('/myorders').get(authToken, getLoggedInUserOrders);
// change endpoint
router.route('/:id').get(authToken, getOrderById);
router.route('/:id/pay').put(authToken, updateOrderToPaid);

module.exports = router;

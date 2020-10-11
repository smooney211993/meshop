const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getLoggedInUserOrders,
} = require('../controllers/orderController');

router.route('/').post(authToken, addOrderItems);
router.route('/myorders').get(authToken, getLoggedInUserOrders);
router.route('/:id').get(authToken, getOrderById);
router.route('/:id/pay').put(authToken, updateOrderToPaid);

module.exports = router;

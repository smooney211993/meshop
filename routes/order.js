const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  addOrderItems,
  getOrderById,
} = require('../controllers/orderController');

router.route('/').post(authToken, addOrderItems);
router.route('/:id').get(authToken, getOrderById);

module.exports = router;

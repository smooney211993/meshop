const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const { addOrderItems } = require('../controllers/orderController');

router.route('/').post(authToken, addOrderItems);

module.exports = router;

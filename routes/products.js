const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');

const Product = require('../models/product');
const {
  getProducts,
  getProductsById,
  createNewReview,
} = require('../controllers/productController');

// fetch all products
// public route
// api/product
router.route('/').get(getProducts);
// fetch products by id
// public route
// api/product/:id

router.route('/:id').get(getProductsById);
router.route('/:id/reviews').post(authToken, createNewReview);

module.exports = router;

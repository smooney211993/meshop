const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');

const Product = require('../models/product');
const {
  getProducts,
  getProductsById,
  createNewReview,
  getTopRatedProducts,
} = require('../controllers/productController');

// fetch all products
// public route
// api/product

router.route('/').get(getProducts);
router.get('/top', getTopRatedProducts);

// fetch products by id
// public route
// api/product/:id
router.route('/:id/reviews').post(authToken, createNewReview);
router.route('/:id').get(getProductsById);

module.exports = router;

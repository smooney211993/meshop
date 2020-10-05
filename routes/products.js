const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {
  getProducts,
  getProductsById,
} = require('../controllers/productController');
// fetch all products
// public route
// api/product
router.route('/').get(getProducts);
// fetch products by id
// public route
// api/product/:id
router.route('/:id').get(getProductsById);
module.exports = router;

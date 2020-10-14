const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const Product = require('../models/product');
const {
  getProducts,
  getProductsById,
  deleteProductById,
} = require('../controllers/productController');

// fetch all products
// public route
// api/product
router.route('/').get(getProducts);
// fetch products by id
// public route
// api/product/:id

router
  .route('/:id')
  .get(getProductsById)
  .delete(authToken, isAdmin, deleteProductById);
module.exports = router;

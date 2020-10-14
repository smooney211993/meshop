const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/authController');

const {
  deleteProductById,
  createProduct,
  updateProductById,
} = require('../controllers/productController');

router.route('/users').get(authToken, isAdmin, getUsers);
router
  .route('/users/:id')
  .get(authToken, isAdmin, getUserById)
  .delete(authToken, isAdmin, deleteUser)
  .put(authToken, isAdmin, updateUser);
router.route('/products/create').post(authToken, isAdmin, createProduct);
router
  .route('/products/:id')
  .delete(authToken, isAdmin, deleteProductById)
  .put(authToken, isAdmin, updateProductById);

module.exports = router;

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

router.route('/users').get(authToken, isAdmin, getUsers);
router
  .route('/users/:id')
  .get(authToken, isAdmin, getUserById)
  .delete(authToken, isAdmin, deleteUser)
  .put(authToken, isAdmin, updateUser);

module.exports = router;

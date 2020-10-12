const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const { getUsers, deleteUser } = require('../controllers/authController');

router.route('/users').get(authToken, isAdmin, getUsers);
router.route('/users/:id').delete(authToken, isAdmin, deleteUser);

module.exports = router;

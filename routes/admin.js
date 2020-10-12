const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const { getUsers } = require('../controllers/authController');

router.route('/users').get(authToken, isAdmin, getUsers);

module.exports = router;

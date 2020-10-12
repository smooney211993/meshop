const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const { getUsers } = require('../controllers/authController');

router.route('/').get(authToken, getUsers);

module.exports = router;

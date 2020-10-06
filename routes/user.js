const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
const { validateUser } = require('../middleware/viladator');

router.route('/').post(validateUser, registerUser);

module.exports = router;

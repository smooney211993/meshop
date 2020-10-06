const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
const { validateUserRegistration } = require('../middleware/viladator');

router.route('/').post(validateUserRegistration, registerUser);

module.exports = router;

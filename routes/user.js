const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
const { validateUserRegistration } = require('../middleware/validator');

router.route('/').post(validateUserRegistration, registerUser);

module.exports = router;

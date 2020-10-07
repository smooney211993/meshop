const express = require('express');
const router = express.Router();
const {
  registerUser,
  updateUserProfile,
} = require('../controllers/authController');
const { validateUserRegistration } = require('../middleware/validator');
const authToken = require('../middleware/authToken');

router
  .route('/')
  .post(validateUserRegistration, registerUser)
  .put(authToken, validateUserRegistration, updateUserProfile);

module.exports = router;

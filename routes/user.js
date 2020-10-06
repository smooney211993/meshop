const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const {
  validateUserRegistration,
  validateAuthUser,
} = require('../middleware/viladator');

router.route('/').post(validateUserRegistration, registerUser);
router.route('/login').post(validateAuthUser, authUser);

module.exports = router;

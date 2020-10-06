const express = require('express');
const router = express.Router();
const { validateAuthUser } = require('../middleware/validator');
const { authUser, getUserProfile } = require('../controllers/authController');
const authToken = require('../middleware/authToken');

router
  .route('/')
  .post(validateAuthUser, authUser)
  .get(authToken, getUserProfile);
module.exports = router;

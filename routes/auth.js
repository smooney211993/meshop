const express = require('express');
const router = express.Router();
const { validateAuthUser } = require('../middleware/validator');
const { authUser } = require('../controllers/authController');

router.route('/').post(validateAuthUser, authUser);
module.exports = router;

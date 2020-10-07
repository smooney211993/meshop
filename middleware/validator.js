const { body, validationResult } = require('express-validator');

exports.validateUserRegistration = [
  body('name', 'Please Enter Your Name').not().isEmpty(),
  body('email', 'Please Include A Valid Email').not().isEmpty(),
  body('password', 'Password Is Required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateAuthUser = [
  body('email', 'Email Is Required').not().isEmpty(),
  body('password', 'Password Is Required To Login').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

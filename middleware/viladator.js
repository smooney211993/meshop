const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('email', 'Please Include A Valid Email').not().isEmpty(),
  body('password', 'Password Is Required').not.isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
];

const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // if token is valid, decode and then will set req.user to the user that is in the decoded token.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: 'token is not valid' });
      // if token does exist but however valid send this error message
    }
  }
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization not granted' });
  }
};

module.exports = authToken;

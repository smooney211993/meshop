const User = require('../models/user');
const isAdmin = async (req, res, next) => {
  try {
    const user = User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Not Authourized As Admin' }] });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Errror' }] });
  }
};

module.exports = isAdmin;

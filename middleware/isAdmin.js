const User = require('../models/user');
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Not Authorized As Admin' }] });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Errror' }] });
  }
};

module.exports = isAdmin;

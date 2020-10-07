const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User Already Exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    if (user && (await user.matchPassword(password))) {
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
};
module.exports = {
  registerUser,
  authUser,
  getUserProfile,
};

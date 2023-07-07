const model = require('../models/userModel');
const User = model.User;
const generateToken = require('../config/generateToken');

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, dob, pic } = req.body;

  if (!firstname || !email || !dob || !password) {
    return res.status(400).json({
      status: 'Required fields missing',
    });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({ status: 'User already exists' });
  }

  const user = new User(req.body);
  await user.save();

  if (user) {
    return res
      .status(201)
      .json({ ...req.body, token: generateToken(user._id) });
  } else {
    return res.status(500).json({
      status: 'Internal Server Error',
    });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      dob: user.dob,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({
      status: 'Invalid email or password',
    });
  }
};

module.exports = { registerUser, authUser };

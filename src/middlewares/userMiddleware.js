const displayNameValidation = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  // verify email regex
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

const { User } = require('../models/index');

const userValidation = (req, res, next) => {
  const { email } = req.body;
  const user = User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  userValidation,
};

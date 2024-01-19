const displayNameValidation = (displayName) => (displayName.length < 8 || !displayName);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userMiddleware = async (req, res, next) => {
  const { displayName, password, email } = req.body;

  if (displayNameValidation(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  // const user = await User.findOne({ where: { email } });
  // if (user) {
  //   return res.status(409).json({ message: 'User already registered' });
  // }

  next();
};

module.exports = userMiddleware;
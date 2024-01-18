const displayNameValidation = (displayName) => (displayName.length < 8 || !displayName);

const userMiddleware = (req, res, next) => {
  const { displayName, password, email } = req.body;

  if (displayNameValidation(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = userMiddleware;
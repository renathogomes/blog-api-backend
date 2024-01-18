const { loginService } = require('../services');

const validEmailMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const user = await loginService.findEmail(email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = validEmailMiddleware;
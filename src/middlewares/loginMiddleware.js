const { loginService } = require('../services');

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await loginService.getByEmail(email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }


  next();
};

module.exports = loginMiddleware;
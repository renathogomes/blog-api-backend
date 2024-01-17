const { loginService } = require('../services');

const userMiddleware = async (req, res, next) => {
  try {
    const { displayName, password, email } = req.body;

    if (displayName.length < 8) {
      return res.status(400).json({ error: '"displayName" length must be at least 8 characters long' });
    }

    // Validar o formato do email usando uma expressão regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: '"email" must be a valid email' });
    }

    // Verificar o comprimento do password
    if (password.length < 6) {
      return res.status(400).json({ error: '"password\" length must be at least 6 characters long' });
    }

    // Verificar se o usuário já está registrado com base no email
    const user = await loginService.findEmail(email);

    if (user) {
      return res.status(409).json({ error: 'User already registered' });
    }

    next();
  } catch (err) {
    console.error('Error when verifying user by email:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = userMiddleware;
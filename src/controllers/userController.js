const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const userNewUserToken = async (req, res) => {
  try {
    const { email } = req.body;
    
    const tokenConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: { email } }, secret, tokenConfig);

    return res.status(201).json({ token });
  } catch (error) {
    console.error('Error during user creation and token generation:', error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = userNewUserToken;

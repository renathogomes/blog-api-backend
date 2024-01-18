const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET;

const userNewUserToken = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await userService.createUser(displayName, email, password, image);

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

const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

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

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  userNewUserToken,
  getAllUsers,
  getUserById,
};

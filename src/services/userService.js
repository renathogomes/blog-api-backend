const { User } = require('../models');

const createUser = (displayName, email, password, image) => User
  .create({ displayName, email, password, image });

const getAllUsers = () => User.findAll({
  attributes: { exclude: 'password' },
});

module.exports = {
  createUser,
  getAllUsers,
};
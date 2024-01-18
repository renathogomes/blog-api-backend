const { User } = require('../models');

const findEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  findEmail,
};

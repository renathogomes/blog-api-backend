const { User } = require('../models');

const findEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error while querying the database:', error);
  }
};
module.exports = {
  findEmail,
};

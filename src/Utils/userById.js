const jwt = require('jsonwebtoken');

const getUserById = async (authorization) => {
  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  
  return decoded.data.userId;
};

module.exports = getUserById;
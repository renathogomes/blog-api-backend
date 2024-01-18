const loginMiddleware = require('./loginMiddleware');
const userMiddleware = require('./userMiddleware');
const validEmailMiddleware = require('./validEmailMiddleware');

module.exports = {
  loginMiddleware,
  userMiddleware,
  validEmailMiddleware,
};

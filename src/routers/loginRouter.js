const route = require('express').Router();

const { loginController } = require('../controllers');
const validateLogin = require('../middlewares/loginMiddleware');

route.post('/', validateLogin, loginController);

module.exports = route;
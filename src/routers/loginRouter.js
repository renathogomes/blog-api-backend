const route = require('express').Router();

const { loginController } = require('../controllers');
const { loginMiddleware } = require('../middlewares');

route.post('/', loginMiddleware, loginController);

module.exports = route;
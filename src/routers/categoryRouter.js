const route = require('express').Router();

const { categoryController } = require('../controllers');
const { categoryMiddleware } = require('../middlewares');
const { tokenMiddleware } = require('../middlewares');

route.post(
  '/',
  tokenMiddleware,
  categoryMiddleware.nameValidate,
  categoryController.createCategory,
);

route.get('/', tokenMiddleware, categoryController.getAllCategories);

module.exports = route;
const route = require('express').Router();

const { postController } = require('../controllers');
const { tokenMiddleware/* , postMiddleware */ } = require('../middlewares');

route.post(
  '/', 
  tokenMiddleware,
  //   postMiddleware.categoryIdValidation,
  postController.createPost,
);

module.exports = route;
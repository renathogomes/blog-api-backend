const route = require('express').Router();

const { postController } = require('../controllers');
const { tokenMiddleware, postMiddleware } = require('../middlewares');

route.post(
  '/', 
  tokenMiddleware,
  postMiddleware.postMiddlewareValidates,
  postController.createPost,
);

module.exports = route;
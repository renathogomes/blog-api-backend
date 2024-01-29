const route = require('express').Router();

const { postController } = require('../controllers');
const { tokenMiddleware, postMiddleware } = require('../middlewares');

route.post(
  '/', 
  tokenMiddleware,
  postMiddleware.postMiddleware,
  postMiddleware.postMiddlewareValidates,
  postController.createPost,
);
route.get(
  '/', 
  tokenMiddleware,
  postController.getPost,
);

module.exports = route;
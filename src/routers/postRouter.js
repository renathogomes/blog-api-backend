const route = require('express').Router();

const { postController } = require('../controllers');
const { tokenMiddleware, postMiddleware } = require('../middlewares');

route.post(
  '/', 
  tokenMiddleware,
  postMiddleware.postMiddlewareValidates,
  postMiddleware.postAllCategoriesExists,
  postController.createPost,
);

route.get('/', postController.getPost);
route.get('/:id', postController.getPostById);

module.exports = route;
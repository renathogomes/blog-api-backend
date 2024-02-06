const route = require('express').Router();

const { postController, postController2 } = require('../controllers');
const { tokenMiddleware, postMiddleware } = require('../middlewares');

route.post(
  '/', 
  tokenMiddleware,
  postMiddleware.postMiddlewareValidates,
  postMiddleware.postAllCategoriesExists,
  postController.createPost,
);

route.get('/', tokenMiddleware, postController.getPost);
route.get('/:id', tokenMiddleware, postController.getPostById);
route.put('/:id', tokenMiddleware, postController2.updatePost);

module.exports = route;
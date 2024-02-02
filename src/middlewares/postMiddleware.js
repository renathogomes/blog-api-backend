// const { categoryService } = require('../services');

const postMiddlewareValidates = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};
/* 
const postMiddleware = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categoryAll = await categoryService.getAllCategories();

  const categoryValid = categoryIds.every((categoryId) => categoryAll
    .some((category) => category.id === categoryId));
  if (!categoryValid) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
}; */

module.exports = {
  postMiddlewareValidates,
/*   postMiddleware, */
};

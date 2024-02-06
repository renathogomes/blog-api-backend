const { categoryService } = require('../services');

const postMiddlewareValidates = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const postMiddlewareUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const postAllCategoriesExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await categoryService.getAllCategories();

  const allCategoriesExists = categoryIds
    .every((categoryId) => categories.some((category) => category.id === categoryId));

  if (!allCategoriesExists) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = {
  postMiddlewareValidates,
  postAllCategoriesExists,
  postMiddlewareUpdate,
};

const { categoryService } = require('../services');

const postMiddleware = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const categoryAll = await categoryService.getAllCategories();

  const category = categoryIds.every((id) => categoryAll.some((cat) => cat.id === id));
  if (!category) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = {
  postMiddleware,
};

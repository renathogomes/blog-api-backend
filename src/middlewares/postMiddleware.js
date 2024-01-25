const { Category } = require('../models');

const postValidation = async (req, res, next) => {
  const { title, content, categoryId } = req.body;
  if (!title || !content || !categoryId) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const categoryIdValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const promises = categoryIds.map((id) => Category.findByPk(id));

  const categories = await Promise.all(promises);

  if (categories.some((category) => category === null)) {
    return res.status(404).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = { postValidation, categoryIdValidation };
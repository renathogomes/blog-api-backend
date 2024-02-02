const { getCategories } = require('../services');

const hasCategory = async (categoryIds) => {
  const categories = await getCategories();
  const categoryExists = categoryIds
    .every((categoryId) => categories.some((category) => category.id === categoryId));
  return categoryExists;
};

module.exports = {
  hasCategory,
};
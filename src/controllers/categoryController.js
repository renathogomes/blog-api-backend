const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
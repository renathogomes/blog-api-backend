const Sequelize = require('sequelize');

const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds, userId }) => {
  const transactinPost = await sequelize.transaction(async (t) => {
    const post = await BlogPost
      .create(
        { title, content, userId, published: new Date(), updated: new Date() },
        { transaction: t },
      );

    const postId = post.dataValues.id;

    const postCategories = categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId, categoryId }, { transaction: t });
    });
    await Promise.all(postCategories);
    return post;
  });
  return { status: 201, data: transactinPost };
};

module.exports = {
  createPost,
};
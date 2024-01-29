const Sequelize = require('sequelize');

const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const createPost = async ({ userId, title, content, categoryIds }) => {
  const transaction = await sequelize.transaction(async () => {
    const newPost = await BlogPost
      .create({ userId, title, content, published: Date.now(), updated: Date.now(),
      }, { transaction });

    const postId = newPost.id;

    const result = categoryIds
      .map(async (categoryId) => {
        await PostCategory.create({
          postId,
          categoryId,
        }, { transaction });
      });

    await Promise.all(result);

    return newPost;
  });
  return transaction;
};

module.exports = {
  createPost,
};
const { BlogPost, PostCategory } = require('../models');

const createPost = async ({ userId, title, content, categoryIds }) => {
  const newPost = await BlogPost.create({
    userId,
    title,
    content,
  });

  const postId = newPost.id;

  const result = categoryIds.map(async (categoryId) => {
    await PostCategory.create({
      postId,
      categoryId,
    });
  });

  //   console.log(result);

  await Promise.all(result);

  return newPost;
};

module.exports = { createPost };
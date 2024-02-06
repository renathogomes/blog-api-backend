const { BlogPost } = require('../models/BlogPost');
const { getPostById } = require('./postService');

const updatePost = async (id, title, content, userId) => {
  const { data } = await getPostById(id);
  if (userId !== data.user.id) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  await BlogPost.update({ title, content }, { where: { id } });
  const newPost = await getPostById(id);
  return { status: 200, data: newPost.data };
};

module.exports = { updatePost };
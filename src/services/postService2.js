const { BlogPost, PostCategory } = require('../models');
const servicePost = require('./postService');

const updatePost = async (id, title, content, userId) => {
  // Será validado que não é possível editar um blogpost com outro usuário que não seja o criador
  const post = await servicePost.getPostById(id);
  
  if (post.data.userId !== userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  await BlogPost.update({ title, content }, { where: { id } });

  const newPost = await servicePost.getPostById(id);
  
  return { status: 200, data: newPost.data };
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) return { status: 404, data: { message: 'Post does not exist' } };

  if (post.userId !== userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }
  try {
    await PostCategory.destroy({ where: { postId: id } });
    await BlogPost.destroy({ where: { id } });
    return { status: 204 };
  } catch (error) {
    return { status: 500, data: { message: 'Internal Error' } };
  }
};

module.exports = {
  updatePost,
  deletePost,
};
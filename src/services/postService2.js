const { BlogPost } = require('../models');
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

module.exports = { updatePost };
const postService = require('../services/postService');
const userToken = require('../Utils/userToken');

const updatePost = async (res, req) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = await userToken(req.headers.authorization);
    const result = await postService.updatePost(id, title, content, userId);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  updatePost,
};
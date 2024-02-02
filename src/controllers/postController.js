const { postService } = require('../services');
const { getUserToken } = require('../Utils/userToken');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = await getUserToken(req.headers.authorization);
    const result = await postService.createPost(title, content, categoryIds, userId);

    if (userId !== result.userId) return res.status(401).json({ message: 'Unauthorized' });

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getPost = async (_req, res) => {
  try {
    const result = await postService.getPost();

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.getPostById(id);

    if (!result) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  createPost,
  getPost,
  getPostById,
};

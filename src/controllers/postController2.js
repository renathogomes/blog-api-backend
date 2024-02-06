const postService2 = require('../services/postService2');
const userToken = require('../Utils/userToken');

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = await userToken.getUserToken(req.headers.authorization);
    const result = await postService2.updatePost(id, title, content, userId);
  
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = await userToken.getUserToken(req.headers.authorization);
    const result = await postService2.deletePost(id, userId);

    if (result.status === 204) return res.status(result.status).end();

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  updatePost,
  deletePost,
};
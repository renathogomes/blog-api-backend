const { postService } = require('../services');

const { getUserToken } = require('../Utils/userToken');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = await getUserToken(req.headers.authorization);
    const { status, data } = await postService.createPost({ title, content, categoryIds, userId });

    if (userId !== data.userId) return res.status(401).json({ message: 'Unauthorized' });

    return res.status(status).json(data);
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: 'Internal Error' });
  }
};

module.exports = {
  createPost,
};

const { postService } = require('../services');

const { getUserToken } = require('../Utils/userToken');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = await getUserToken(req.headers.authorization);
    const post = await postService.createPost({ userId, title, content, categoryIds });

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: 'Internal Error' });
  }
};

module.exports = {
  createPost,
};

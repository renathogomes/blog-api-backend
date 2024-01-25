const jwt = require('jsonwebtoken');
const { postService } = require('../services');

const getUserById = async (autth) => {
  const token = autth.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);

  return decoded.data.userId;
};

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = await getUserById(req.headers.authorization);
    const post = await postService.createPost({ userId, title, content, categoryIds });

    return res.status(201).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  createPost,
};

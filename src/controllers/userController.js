const userService = require('../services/userService');

// Crie uma função assíncrona chamada newUser e extraia as propriedades "displayName", "email", "password" e "image" do corpo da requisição "req.body".
const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const user = await userService.newUser(displayName, email, password, image);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};  

// Crie uma função assíncrona chamada "getAllUsers" que recebe dois parâmetros: "_req" e "res". Utilize a biblioteca 'userService' para obter a lista de usuários.
const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

// Crie uma função assíncrona chamada "getUserById" que recebe dois parâmetros: "req" e "res". Utilize a biblioteca 'userService' para obter um usuário com base no ID fornecido através dos parâmetros da requisição.
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  newUser,
  getAllUsers,
  getUserById,
};

// crie uma arrow function chamada loginController que o utilize o userService para autenticar um usuário com base nos parametros de email e senha fornecidos na requisição.
const { userService } = require('../services');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
  
    return res.status(user.status).json(user.data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  loginController,
};
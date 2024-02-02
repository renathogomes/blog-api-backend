// crie uma arrow function chamada loginController que o utilize o userService para autenticar um usuário com base nos parametros de email e senha fornecidos na requisição.
const { userService } = require('../services');

const loginController = (req, res) => {
  const { email, password } = req.body;
  const user = userService.login(email, password);
  if (user.error) return res.status(401).json(user);
  return res.status(200).json(user);
};

module.exports = {
  loginController,
};
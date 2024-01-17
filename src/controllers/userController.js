const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET;

const userNewUserToken = async (req, res) =>  {
  try {
    const { displayName, email, password, image } = req.body;

    // Criar novo usuário
    const newUser = await userService.createUser(displayName, email, password, image);

    // Configurar informações do token
    const tokenData = { data: newUser.email };

    // Gerar token JWT
    const token = jwt.sign(tokenData, secret, { expiresIn: '7d', algorithm: 'HS256' });

    // Retornar resposta com status 201 e token gerado
    res.status(201).json({ token });

  } catch (error) {
    console.error('Error during user creation and token generation:', error);
    res.status(500).json({ error: 'Internal Error' });
  }
}

module.exports = userNewUserToken;

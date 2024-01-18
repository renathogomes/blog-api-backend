const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET;

const userNewUserToken = async (req, res) =>  {
  try {
    const { displayName, email, password, image } = req.body;

    await userService.createUser(displayName, email, password, image);

    const emailUser = newUser.email;

    // Configurar informações do token
    const tokenData = { data: { emailUser } };

    //Gerar token config
    const tokenConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    // Gerar token JWT
    const token = jwt.sign(tokenData, secret, tokenConfig);

    // Retornar resposta com status 201 e token gerado
    res.status(201).json({ token });

  } catch (error) {
    console.error('Error during user creation and token generation:', error);
    res.status(500).json({ message: 'Internal Error' });
  }
}

module.exports = userNewUserToken;

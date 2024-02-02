const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Crie uma função assíncrona chamada "login" que recebe dois parâmetros: "email" e "password". Utilize a biblioteca 'jsonwebtoken' para gerar um token JWT. Certifique-se de importar o módulo 'User' do arquivo '../models'. O segredo para a assinatura do token deve ser obtido da variável de ambiente 'JWT_SECRET'.

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !Object.is(user.password, password)) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }

  // Se o usuário for encontrado e a senha corresponder, utilize a função "jwt.sign" para gerar um token JWT O payload do token deve ser um objeto contendo as propriedades "data" com um objeto contendo as propriedades "email" e "userId" (extraídas do usuário encontrado). Configure as opções do jwt com um tempo de expiração de 7 dias e o algoritmo 'HS256'. Retorne um objeto com status 200 e um objeto "data" contendo o token gerado.
  const { id } = user;
  const token = jwt
    .sign(
      { data: { email, userId: id } },
      process.env.JWT_SECRET,
      { expiresIn: '7d', algorithm: 'HS256' },
    );

  return { status: 200, data: { token } };
};

// Crie uma função assíncrona chamada "createUser" que recebe quatro parâmetros: "displayName", "email", "password" e "image". Utilize a biblioteca 'jsonwebtoken' para gerar um token JWT. Certifique-se de importar o módulo 'User' do arquivo '../models'. O segredo para a assinatura do token deve ser obtido da variável de ambiente 'JWT_SECRET'.
const createUser = async (displayName, email, password, image) => {
// Utilize o método "findOne" do modelo "User" para verificar se já existe um usuário com o email fornecido. Se o usuário já existir, retorne um objeto com status 409 e uma mensagem indicando "User already registered".
  const user = await User.findOne({ where: { email } });

  if (user) return { status: 409, data: { message: 'User already registered' } };

  const newUser = await User.create({ displayName, email, password, image });

  // Se o usuário não existir, utilize a função "jwt.sign" para gerar um token JWT. O payload do token deve ser um objeto contendo as propriedades "data" com a propriedade "email". Configure as opções do jwt com um tempo de expiração de 7 dias e o algoritmo 'HS256'.
  const { id } = newUser;
  const token = jwt
    .sign(
      { data: { email, userId: id, name: displayName } },
      process.env.JWT_SECRET,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
  return { status: 201, data: { token } };
};

// Crie uma função assíncrona chamada "getAllUsers" que não recebe parâmetros. Utilize o método "findAll" do modelo "User" para encontrar todos os usuários cadastrados. Retorne um objeto com status 200 e um array "data" contendo todos os usuários encontrados.
const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { status: 200, data: users };
};

// Crie uma função assíncrona chamada "getUserById" que recebe um parâmetro "id". Utilize o método "findByPk" do modelo "User" para encontrar o usuário com o ID fornecido. Retorne um objeto com status 200 e um objeto "data" contendo o usuário encontrado. Se o usuário não for encontrado, retorne um objeto com status 404 e uma mensagem indicando "User does not exist".
const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });

  if (!user) return { status: 404, data: { message: 'User does not exist' } };

  return { status: 200, data: user };
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
};
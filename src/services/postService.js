const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

// crie uma arrow function que cria post que recebe os seguintes parâmetros: `title`: O título da postagem do tipo string. - `content`: O conteúdo da postagem do tipo (string). - `categoryIds`: Um array de IDs de categorias associadas à postagem. - `userId`: O ID do usuário que está criando a postagem do tipo string.  O objetico da função é realizar operações em uma transação do Sequelize:  1. Criar uma nova postagem no banco de dados usando o modelo `BlogPost` com os campos `title`, `content`, `userId`, `published` e `updated`. O valor de `published` e `updated` pode ser qualquer valor.  2. Obter o ID da postagem recém-criada.  3. Para cada `categoryId` em `categoryIds`, criar uma entrada na tabela `PostCategory` associando a postagem ao ID da categoria.  4. Garantir que todas as operações são realizadas dentro da transação. A função deve retornar a postagem recém-criada.  Utilize as funções do Sequelize conforme necessário.
const createPost = async (title, content, categoryIds, userId) => {
  const newPost = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create(
      {
        title, content, userId, published: Date.now(), updated: Date.now() },
      { transaction: t },
    );
    const postId = post.id;

    const newPostCategory = categoryIds.map(async (categoryId) => {
      await PostCategory
        .create({ postId, categoryId }, { transaction: t }); 
    });

    await Promise.all(newPostCategory);
    return post;
  });
  console.log(newPost);
  return { status: 201, data: newPost };
};

// Crie uma função assíncrona chamada "getPosts" que não recebe parâmetros. Utilize os modelos 'BlogPost', 'User' e 'Category' do seu aplicativo. Certifique-se de que 'BlogPost' possui relacionamentos com 'User' e 'Category'.
const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { status: 200, data: posts };
};

// Crie uma função assíncrona chamada "getPostById" que recebe um parâmetro "id". Utilize os modelos 'BlogPost', 'User' e 'Category' do seu aplicativo. Certifique-se de que 'BlogPost' possui relacionamentos com 'User' e 'Category'
const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
  });
  return { status: 200, data: { post } };
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
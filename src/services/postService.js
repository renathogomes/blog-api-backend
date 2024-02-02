const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const hasCategory = require('../Utils/hasCategory');
const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

// crie uma arrow function que cria post que recebe os seguintes parâmetros: `title`: O título da postagem do tipo string. - `content`: O conteúdo da postagem do tipo (string). - `categoryIds`: Um array de IDs de categorias associadas à postagem. - `userId`: O ID do usuário que está criando a postagem do tipo string.  O objetico da função é realizar operações em uma transação do Sequelize:  1. Criar uma nova postagem no banco de dados usando o modelo `BlogPost` com os campos `title`, `content`, `userId`, `published` e `updated`. O valor de `published` e `updated` pode ser qualquer valor.  2. Obter o ID da postagem recém-criada.  3. Para cada `categoryId` em `categoryIds`, criar uma entrada na tabela `PostCategory` associando a postagem ao ID da categoria.  4. Garantir que todas as operações são realizadas dentro da transação. A função deve retornar a postagem recém-criada.  Utilize as funções do Sequelize conforme necessário.
const createPost = async (title, content, categoryIds, userId) => {
  if (!hasCategory(categoryIds)) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } }; 
  }
  const newPost = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postId = post.dataValues.id;

    const newPostCategory = categoryIds.forEach(async (categoryId) => PostCategory
      .create({ postId, categoryId }, { transaction: t }));

    await Promise.all(newPostCategory);
    return post;
  });
  return newPost;
};

module.exports = {
  createPost,
};
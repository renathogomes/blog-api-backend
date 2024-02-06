module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,        
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
    });

    PostCategory.associate = (models) => {
       models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId'
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId'
        });
    }

    return PostCategory;

};

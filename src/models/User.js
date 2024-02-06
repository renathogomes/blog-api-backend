module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'users',
        timestamps: false,
        underscored: true,
    });

    User.associate = (models) => {
        User.hasMany(models.BlogPost, { foreignKey: 'user_id', as: 'user' });
    };

    return User;
}
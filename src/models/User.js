module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
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
    });

    return User;
}
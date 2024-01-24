module.exports = (sequelize, Datatypes) => {
    const Category = sequelize.define('Category', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Datatypes.INTEGER
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categories',
        timestamps: false,
        underscored: true
    });

    return Category;
};

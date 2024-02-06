module.exports = (sequelize, Datatypes) => {
    const Category = sequelize.define('Category', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Datatypes.INTEGER
        },
        name: {
            type: Datatypes.STRING,
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Category;
};

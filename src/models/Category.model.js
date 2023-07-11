const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const Category = sequelize.define('Category', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    paranoid: true,
    freezeTableName: true
})


module.exports = Category;
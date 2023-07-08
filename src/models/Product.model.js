const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: Datatypes.INTEGER,
        allowNull: true,
    },
})

module.exports = Product;
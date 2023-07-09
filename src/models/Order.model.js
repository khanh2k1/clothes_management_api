const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, 
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: 'pending'
    },  
}, {
    timestamps: true,
    freezeTableName: true
}) 

module.exports = Order;
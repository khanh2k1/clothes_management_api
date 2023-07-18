const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const OrderProduct = sequelize.define('OrderProduct', {
    
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'order_product',
    timestamps: true,
    paranoid: true,
})

module.exports = OrderProduct;
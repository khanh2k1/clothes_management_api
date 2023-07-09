const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const OrderProduct = sequelize.define('OrderProduct', {
    
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Order',
            key: 'id'
        }
    }, 
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',
            key: 'id'
        }
    }, 
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'order_product',

})

module.exports = OrderProduct;
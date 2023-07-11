const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    cancelledReason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    received_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    cancelled_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
})

module.exports = Order;
const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
}, {
    freezeTableName: true
})

module.exports = Address;
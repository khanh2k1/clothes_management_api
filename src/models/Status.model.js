const sequelize  = require('../database/mysql/connect');
const { DataTypes } = require('sequelize');
const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    freezeTableName: true,
    paranoid: true
})

module.exports = Status;
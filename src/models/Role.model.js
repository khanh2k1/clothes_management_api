const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');
const roles = require('../constant/Roles');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    slug: {
        type : DataTypes.STRING,
        allowNull: false,
        
        unique: true
    }
}, {
    freezeTableName: true,
})

module.exports = Role;
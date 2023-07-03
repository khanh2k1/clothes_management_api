const { Sequelize } = require('sequelize')
const env_mysql = require('../../config/mysql/env')
const sequelize = new Sequelize(
    env_mysql.DB_NAME, 
    env_mysql.DB_HOST, 
    env_mysql.DB_PASS, 
    {
        host: env_mysql.DB_HOST,
        dialect: env_mysql.DB_DIALECT,
    }
)
module.exports = sequelize
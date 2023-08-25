const { Sequelize } = require('sequelize')
const { env_mysql } = require('../../configs/env')

const sequelize = new Sequelize(
    env_mysql.DB_NAME,
    env_mysql.DB_USER,
    env_mysql.DB_PASS,
    {
        host: env_mysql.DB_HOST,
        port: env_mysql.DB_PORT,
        dialect: env_mysql.DB_DIALECT,
    } 
)
    

module.exports = sequelize
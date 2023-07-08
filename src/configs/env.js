
require('dotenv').config()

const env_mysql = {
    DB_NAME: process.env.DB_NAME || 'nodejs-course',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || '25032001',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    DB_PORT: process.env.DB_PORT || 3306,
}
const env_jwt = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'Trinh Tuong Thy',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
}

const port = process.env.PORT || 3001

module.exports = { env_mysql, env_jwt, port }
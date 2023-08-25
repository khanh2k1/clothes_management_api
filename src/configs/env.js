
require('dotenv').config()

const env_mysql = {
    DB_NAME: process.env.DB_NAME || 'nodejs-course',
    DB_DEV: process.env.DB_DEV || 'nodejs-course_developer',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || '25032001',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    DB_PORT: process.env.DB_PORT || 3306,
}

const env_mongoDB = {
    DB_NAME: process.env.DB_NAME_MONGO || 'nodejs-course',
    DB_HOST: process.env.DB_HOST_MONGO || '127.0.0.1',
    DB_PORT: process.env.DB_PORT_MONGO || 27017,
}

const env_jwt = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'Trinh Tuong Thy',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
}

const env_nodemailer = {
    client_id: process.env.client_id,
    project_id: process.env.project_id,
    refresh_token: process.env.refresh_token,
    client_secret: process.env.client_secret,
}

const port = process.env.PORT || 3001

module.exports = { env_mysql, env_mongoDB, env_jwt, port, env_nodemailer }
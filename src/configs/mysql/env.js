require('dotenv').config()
const env = process.env

const env_mysql = {
    DB_NAME: env.DB_NAME,
    DB_HOST: env.DB_HOST,
    DB_PASS: env.DB_PASS,
    DB_DIALECT: env.DB_DIALECT,
    
}


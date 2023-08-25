const { env_mysql } = require('../src/configs/env')

module.exports = {
  "development": {
    "username": env_mysql.DB_USER,
    "password": env_mysql.DB_PASS,
    "database": env_mysql_DB_DEV,
    "host": env_mysql.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root", 
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

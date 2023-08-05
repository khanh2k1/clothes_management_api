
const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  otp: {
    type: DataTypes.STRING,
  }
},
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
  });


// User.sync({ alter: true }).then(()=> {
//   console.log('User table created');
// }).catch((err) => {
//   console.log(err);
// })

module.exports = User;
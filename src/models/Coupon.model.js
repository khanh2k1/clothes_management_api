const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/connect');

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('percent', 'money'),
        allowNull: false,
        defaultValue: 'percent',
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true,
    paranoid: true
})


// Coupon.sync({ force: true }).then(() => {
//     console.log('Coupon table created');
// })
module.exports = Coupon;
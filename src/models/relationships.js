const User = require('./User.model');
const Address = require('./Address.model');
const Category = require('./Category.model');
const Product = require('./Product.model');
const Coupon = require('./Coupon.model');
const Order = require('./Order.model');
const OrderProduct = require('./OrderProduct.model');
const Role = require('./Role.model');
const Status = require('./Status.model');
// one to one
// custom name of foreign key : { foreignKey: 'userIdd', sourceKey: 'id'}
User.hasOne(Address, { foreignKey: 'userId', sourceKey: 'id' })
Address.belongsTo(User, { foreignKey: 'userId' })

Role.hasOne(User, { foreignKey: 'role', sourceKey: 'slug' },)
User.belongsTo(Role, { foreignKey: 'role' })

// one Order only has one status
Status.hasOne(Order, {
    foreignKey: {
        name: 'status',
        allowNull: false,
        defaultValue: 'pending'
    },
    sourceKey: 'slug'
})
Order.belongsTo(Order, { foreignKey: 'status' })

// user cancel order
User.hasOne(Order, {
    foreignKey: 'cancelledUserId',
    sourceKey: 'id'
})
Order.belongsTo(User, { foreignKey: 'cancelledUserId' })

// one to many
User.hasMany(Order, {
    foreignKey: {
        name: 'orderedUserId',
        allowNull: false,
    },
    sourceKey: 'id'
})
Order.belongsTo(User, { foreignKey: 'orderedUserId' })

Product.hasMany(Coupon, { foreignKey: 'productId', allowNull: false })
Coupon.belongsTo(Product, { foreignKey: 'productId', allowNull: false })

Category.hasMany(Product, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
})
Product.belongsTo(Category, { foreignKey: 'categoryId' })


Coupon.hasMany(Order, {foreignKey: 'couponId', allowNull: false, sourceKey: 'id'})
Order.belongsTo(Coupon, {foreignKey: 'couponId', allowNull: false})


// many to many
Order.belongsToMany(Product, {
    through: { model: OrderProduct },
    foreignKey: {
        name: 'orderId',
        allowNull: false,
    }
});

Product.belongsToMany(Order, {
    through: { model: OrderProduct },
    foreignKey:
    {
        name: 'productId',
        allowNull: false,
    }
});

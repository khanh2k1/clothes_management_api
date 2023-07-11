const User = require('./User.model');
const Address = require('./Address.model');
const Category = require('./Category.model');
const Product = require('./Product.model');
const Campaign = require('./Campaign.model');
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
        allowNull: false
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

Product.hasMany(Campaign, { foreignKey: 'productId', allowNull: false })
Campaign.belongsTo(Product, { foreignKey: 'productId', allowNull: false })

Category.hasMany(Product, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
})
Product.belongsTo(Category, { foreignKey: 'categoryId' })

// many to many
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId', allowNull: false });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId', allowNull: false });

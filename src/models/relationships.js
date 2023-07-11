const User = require('./User.model');
const Address = require('./Address.model');
const Category = require('./Category.model');
const Product = require('./Product.model');
const Campaign = require('./Campaign.model');
const Order = require('./Order.model');
const OrderProduct = require('./OrderProduct.model');
const Role = require('./Role.model');

// one to one
// custom name of foreign key : { foreignKey: 'userIdd', sourceKey: 'id'}
User.hasOne(Address, { foreignKey: 'userId' , sourceKey: 'id' })
Address.belongsTo(User, { foreignKey: 'userId' })

Role.hasOne(User, { foreignKey: 'role', sourceKey: 'slug'},)
User.belongsTo(Role, { foreignKey: 'role' })

// one to many
User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })

Product.hasMany(Campaign, { foreignKey: 'productId' })
Campaign.belongsTo(Product, { foreignKey: 'productId' })

Category.hasMany(Product, { foreignKey: 'categoryId' })
Product.belongsTo(Category, { foreignKey: 'categoryId' })

// many to many
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });

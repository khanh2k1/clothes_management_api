const User = require('./User.model');
const Address = require('./Address.model');

User.hasOne(Address, { foreignKey: 'userId'})
Address.belongsTo(User, { foreignKey: 'userId' })


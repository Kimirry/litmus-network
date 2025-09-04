const sequelize = require('../config/database');

const User = require('./user');
const Payment = require('./payment');
const Session = require('./session');
const Voucher = require('./voucher');

// Define relationships
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User);

User.hasMany(Session, { foreignKey: 'userId' });
Session.belongsTo(User);

User.hasMany(Voucher, { foreignKey: 'userId' });
Voucher.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Payment,
  Session,
  Voucher,
};

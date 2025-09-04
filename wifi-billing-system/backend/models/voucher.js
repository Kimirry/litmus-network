const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Voucher = sequelize.define('Voucher', {
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  plan: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('used', 'unused'),
    defaultValue: 'unused',
  },
});

module.exports = Voucher;

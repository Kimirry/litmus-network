const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mac: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // optional — depends if 1 device per user
  },
  password: DataTypes.STRING, // optional
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'inactive',
  }
});

module.exports = User;

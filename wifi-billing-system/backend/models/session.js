const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
  mac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endedAt: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('active', 'expired', 'disconnected'),
    defaultValue: 'active',
  },
});

module.exports = Session;

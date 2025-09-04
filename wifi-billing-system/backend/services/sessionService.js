// services/sessionService.js
const { Session } = require('../models');

exports.startSession = async ({ userId, mac }) => {
  return await Session.create({
    userId,
    mac,
    startedAt: new Date(),
    status: 'active',
  });
};

exports.endSession = async (mac) => {
  return await Session.update(
    { status: 'expired', endedAt: new Date() },
    { where: { mac, status: 'active' } }
  );
};

exports.getActiveSessionForMac = async (mac) => {
  return await Session.findOne({
    where: { mac, status: 'active' },
  });
};

exports.getSessionsForUser = async (userId) => {
  return await Session.findAll({ where: { userId } });
};

// services/paymentService.js
const { Payment } = require('../models');

exports.recordPayment = async ({ userId, amount, method }) => {
  return await Payment.create({ userId, amount, method });
};

exports.getPaymentsForUser = async (userId) => {
  return await Payment.findAll({ where: { userId } });
};

exports.getTotalPaidByUser = async (userId) => {
  const payments = await Payment.findAll({ where: { userId } });
  return payments.reduce((total, payment) => total + payment.amount, 0);
};

// utils/helper.js

exports.generateRandomCode = (length = 6) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

exports.formatPhoneNumber = (phone) => {
  return phone.replace(/[^0-9]/g, '').replace(/^0/, '254');
};

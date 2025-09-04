// utils/macHelper.js

exports.cleanMac = (mac) => {
  // Remove colons, dashes, convert to uppercase
  return mac.toUpperCase().replace(/[^A-F0-9]/gi, '');
};

exports.standardizeMac = (mac) => {
  const cleaned = exports.cleanMac(mac);
  return cleaned.match(/.{1,2}/g).join(':');
};

// utils/logger.js

exports.log = (...args) => {
  console.log(`[INFO]`, ...args);
};

exports.error = (...args) => {
  console.error(`[ERROR]`, ...args);
};

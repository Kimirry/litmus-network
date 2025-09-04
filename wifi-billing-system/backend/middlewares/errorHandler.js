// errorHandler.js

const logError = (err) => {
  // This could be replaced with a logging system like Winston, Sentry, etc.
  console.error(`[ERROR] ${err.name}: ${err.message}`);
};

const errorHandler = (err, req, res, next) => {
  logError(err);

  const statusCode = err.statusCode || 500;
  const response = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  // Hide stack trace in production
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;

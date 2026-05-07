const AppError = require('../errors/AppError');

const notFoundMiddleware = (req, res, next) => {
  next(new AppError('Route not found', 404));
};

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    message: error.message || 'Internal server error',
    ...(error.details && { details: error.details }),
  });
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};

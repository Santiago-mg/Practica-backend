/**
 * Custom application error.
 * Has a statusCode and an optional details payload.
 * The error middleware uses it to format the HTTP response.
 */
class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
  }
}

module.exports = AppError;

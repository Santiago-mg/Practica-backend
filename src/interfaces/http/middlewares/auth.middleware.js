const AppError = require('../errors/AppError');

/**
 * JWT auth middleware factory.
 *
 * Receives a TokenService instance via dependency injection
 * (built in container.js). The middleware verifies the Bearer
 * token and attaches the decoded payload to req.user.
 */
const buildAuthMiddleware = ({ tokenService }) => {
  return (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(new AppError('Authorization header is required', 401));
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return next(new AppError('Authorization header must use Bearer token format', 401));
    }

    try {
      req.user = tokenService.verify(token);
      next();
    } catch (error) {
      return next(new AppError('Invalid or expired token', 401));
    }
  };
};

module.exports = buildAuthMiddleware;

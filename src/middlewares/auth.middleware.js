const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new AppError('Authorization header is required', 401));
  }

  const [type, token] = authorizationHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(new AppError('Authorization header must use Bearer token format', 401));
  }

  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT secret is not configured', 500));
  }

  try {
    // If the token is valid, the decoded user data is stored in req.user.
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

module.exports = authMiddleware;

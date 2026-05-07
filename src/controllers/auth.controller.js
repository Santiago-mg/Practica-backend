const authService = require('../services/auth.service');
const AppError = require('../utils/appError');

const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.validated.body);

    if (!token) {
      return next(new AppError('Invalid email or password', 401));
    }

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};

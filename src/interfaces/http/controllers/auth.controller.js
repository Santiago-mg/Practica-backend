const AppError = require('../errors/AppError');

/**
 * Auth controller factory.
 *
 * Receives the LoginUserUseCase via dependency injection.
 * The controller is just an HTTP adapter:
 *   - reads validated input from req
 *   - calls the use case
 *   - turns the result into an HTTP response
 */
const buildAuthController = ({ loginUserUseCase }) => {
  const login = async (req, res, next) => {
    try {
      const token = await loginUserUseCase.execute(req.validated.body);

      if (!token) {
        return next(new AppError('Invalid email or password', 401));
      }

      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  return { login };
};

module.exports = buildAuthController;

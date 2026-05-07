const AppError = require('../errors/AppError');

/**
 * Generic Joi validation middleware.
 *
 * Reads from req[source] (body, params or query), validates it,
 * and stores the cleaned value into req.validated[source].
 * Controllers always read req.validated.body/params/query.
 */
const validate = (schema, source) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => detail.message);
      return next(new AppError('Validation error', 400, details));
    }

    req.validated = {
      ...req.validated,
      [source]: value,
    };

    next();
  };
};

module.exports = validate;

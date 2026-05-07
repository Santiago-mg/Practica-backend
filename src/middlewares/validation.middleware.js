const AppError = require('../utils/appError');

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

    // Keep validated values separated so query params can be safely converted.
    req.validated = {
      ...req.validated,
      [source]: value,
    };

    next();
  };
};

module.exports = validate;

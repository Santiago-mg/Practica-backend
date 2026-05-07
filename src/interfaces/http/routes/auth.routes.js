const express = require('express');

const validate = require('../middlewares/validation.middleware');
const { loginSchema } = require('../validations/auth.validation');

/**
 * Auth routes factory.
 * Receives the auth controller from the container.
 */
const buildAuthRoutes = ({ authController }) => {
  const router = express.Router();

  router.post('/login', validate(loginSchema, 'body'), authController.login);

  return router;
};

module.exports = buildAuthRoutes;

const express = require('express');

const validate = require('../middlewares/validation.middleware');
const {
  propertyCreateSchema,
  propertyIdSchema,
  propertyQuerySchema,
  propertyUpdateSchema,
} = require('../validations/property.validation');

/**
 * Property routes factory.
 * Receives the property controller and the auth middleware
 * (already wired to the TokenService) from the container.
 */
const buildPropertyRoutes = ({ propertyController, authMiddleware }) => {
  const router = express.Router();

  router.get(
    '/',
    validate(propertyQuerySchema, 'query'),
    propertyController.getAllProperties
  );

  router.get(
    '/:id',
    validate(propertyIdSchema, 'params'),
    propertyController.getPropertyById
  );

  router.post(
    '/',
    authMiddleware,
    validate(propertyCreateSchema, 'body'),
    propertyController.createProperty
  );

  router.put(
    '/:id',
    authMiddleware,
    validate(propertyIdSchema, 'params'),
    validate(propertyUpdateSchema, 'body'),
    propertyController.updateProperty
  );

  router.delete(
    '/:id',
    authMiddleware,
    validate(propertyIdSchema, 'params'),
    propertyController.deleteProperty
  );

  return router;
};

module.exports = buildPropertyRoutes;

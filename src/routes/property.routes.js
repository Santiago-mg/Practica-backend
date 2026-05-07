const express = require('express');

const propertyController = require('../controllers/property.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  propertyCreateSchema,
  propertyIdSchema,
  propertyQuerySchema,
  propertyUpdateSchema,
} = require('../validations/property.validation');

const router = express.Router();

router.get('/', validate(propertyQuerySchema, 'query'), propertyController.getAllProperties);
router.get('/:id', validate(propertyIdSchema, 'params'), propertyController.getPropertyById);
router.post('/', authMiddleware, validate(propertyCreateSchema, 'body'), propertyController.createProperty);
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

module.exports = router;

const Joi = require('joi');

const propertyIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const propertyCreateSchema = Joi.object({
  title: Joi.string().trim().required(),
  price: Joi.number().integer().positive().required(),
  location: Joi.string().trim().required(),
  available: Joi.boolean().default(true),
});

const propertyUpdateSchema = Joi.object({
  title: Joi.string().trim(),
  price: Joi.number().integer().positive(),
  location: Joi.string().trim(),
  available: Joi.boolean(),
}).min(1);

const propertyQuerySchema = Joi.object({
  location: Joi.string().trim(),
  minPrice: Joi.number().integer().min(0),
  maxPrice: Joi.when('minPrice', {
    is: Joi.exist(),
    then: Joi.number().integer().min(Joi.ref('minPrice')),
    otherwise: Joi.number().integer().min(0),
  }),
  page: Joi.number().integer().positive().default(1),
  limit: Joi.number().integer().positive().max(100).default(10),
});

module.exports = {
  propertyIdSchema,
  propertyCreateSchema,
  propertyUpdateSchema,
  propertyQuerySchema,
};

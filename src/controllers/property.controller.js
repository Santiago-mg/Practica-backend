const propertyService = require('../services/property.service');
const AppError = require('../utils/appError');

const getAllProperties = async (req, res, next) => {
  try {
    const result = await propertyService.getAllProperties(req.validated.query);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const property = await propertyService.getPropertyById(id);

    if (!property) {
      return next(new AppError('Property not found', 404));
    }

    res.json(property);
  } catch (error) {
    next(error);
  }
};

const createProperty = async (req, res, next) => {
  try {
    const newProperty = await propertyService.createProperty(req.validated.body);

    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};

const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const updatedProperty = await propertyService.updateProperty(id, req.validated.body);

    if (!updatedProperty) {
      return next(new AppError('Property not found', 404));
    }

    res.json(updatedProperty);
  } catch (error) {
    next(error);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const deletedProperty = await propertyService.deleteProperty(id);

    if (!deletedProperty) {
      return next(new AppError('Property not found', 404));
    }

    res.json({
      message: 'Property deleted successfully',
      data: deletedProperty,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};

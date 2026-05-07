const AppError = require('../errors/AppError');

/**
 * Property controller factory.
 *
 * Receives all the property use cases via dependency injection
 * and returns the request handlers used by the routes file.
 */
const buildPropertyController = ({
  getAllPropertiesUseCase,
  getPropertyByIdUseCase,
  createPropertyUseCase,
  updatePropertyUseCase,
  deletePropertyUseCase,
}) => {
  const getAllProperties = async (req, res, next) => {
    try {
      const result = await getAllPropertiesUseCase.execute(req.validated.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  const getPropertyById = async (req, res, next) => {
    try {
      const { id } = req.validated.params;
      const property = await getPropertyByIdUseCase.execute(id);

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
      const newProperty = await createPropertyUseCase.execute(req.validated.body);
      res.status(201).json(newProperty);
    } catch (error) {
      next(error);
    }
  };

  const updateProperty = async (req, res, next) => {
    try {
      const { id } = req.validated.params;
      const updatedProperty = await updatePropertyUseCase.execute(id, req.validated.body);

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
      const deletedProperty = await deletePropertyUseCase.execute(id);

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

  return {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};

module.exports = buildPropertyController;

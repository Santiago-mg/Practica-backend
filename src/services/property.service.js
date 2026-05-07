const { Op } = require('sequelize');

const { Property } = require('../models');

const getAllProperties = async (filters) => {
  const { limit, location, maxPrice, minPrice, page } = filters;
  const where = {};

  if (location) {
    where.location = {
      [Op.iLike]: `%${location}%`,
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price[Op.gte] = minPrice;
    }

    if (maxPrice !== undefined) {
      where.price[Op.lte] = maxPrice;
    }
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Property.findAndCountAll({
    where,
    limit,
    offset,
    order: [['id', 'ASC']],
  });

  return {
    data: rows,
    total: count,
    page,
    limit,
  };
};

const getPropertyById = async (id) => {
  return Property.findByPk(id);
};

const createProperty = async (propertyData) => {
  return Property.create(propertyData);
};

const updateProperty = async (id, propertyData) => {
  const property = await Property.findByPk(id);

  if (!property) {
    return null;
  }

  await property.update(propertyData);

  return property;
};

const deleteProperty = async (id) => {
  const property = await Property.findByPk(id);

  if (!property) {
    return null;
  }

  await property.destroy();

  return property;
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};

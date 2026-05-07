const { Op } = require('sequelize');

const IPropertyRepository = require('../../domain/repositories/IPropertyRepository');
const Property = require('../../domain/entities/Property');
const PropertyModel = require('../models/PropertyModel');

/**
 * Sequelize implementation of IPropertyRepository.
 *
 * Knows how to translate filters into Sequelize "where" clauses,
 * how to do pagination with limit/offset, and how to map the model
 * into the domain entity.
 */
class SequelizePropertyRepository extends IPropertyRepository {
  /**
   * Convert a Sequelize record into the domain entity.
   * @private
   */
  _toEntity(record) {
    if (!record) {
      return null;
    }

    return new Property({
      id: record.id,
      title: record.title,
      price: record.price,
      location: record.location,
      available: record.available,
    });
  }

  async findAll(filters) {
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

    const { count, rows } = await PropertyModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    return {
      data: rows.map((row) => this._toEntity(row)),
      total: count,
      page,
      limit,
    };
  }

  async findById(id) {
    const record = await PropertyModel.findByPk(id);
    return this._toEntity(record);
  }

  async create(propertyData) {
    const record = await PropertyModel.create(propertyData);
    return this._toEntity(record);
  }

  async update(id, propertyData) {
    const record = await PropertyModel.findByPk(id);

    if (!record) {
      return null;
    }

    await record.update(propertyData);

    return this._toEntity(record);
  }

  async delete(id) {
    const record = await PropertyModel.findByPk(id);

    if (!record) {
      return null;
    }

    const deletedEntity = this._toEntity(record);
    await record.destroy();

    return deletedEntity;
  }
}

module.exports = SequelizePropertyRepository;

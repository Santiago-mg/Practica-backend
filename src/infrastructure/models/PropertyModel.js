const { DataTypes } = require('sequelize');

const { sequelize } = require('../database/sequelize');

/**
 * Sequelize Property model (persistence model).
 */
const PropertyModel = sequelize.define(
  'Property',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'properties',
    timestamps: true,
  }
);

module.exports = PropertyModel;

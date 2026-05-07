const { DataTypes } = require('sequelize');

const { sequelize } = require('../database/sequelize');

/**
 * Sequelize User model (persistence model).
 *
 * This is NOT the domain entity. This is the table mapping.
 * It only lives in the infrastructure layer.
 */
const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = UserModel;

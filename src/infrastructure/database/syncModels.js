const { sequelize } = require('./sequelize');

// Importing the models is required so Sequelize registers them
// before sync() is called.
require('../models/UserModel');
require('../models/PropertyModel');

/**
 * Sync all Sequelize models with the database.
 * `alter: true` keeps existing data and updates table shape during development.
 */
const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = syncModels;

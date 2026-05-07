const bcrypt = require('bcryptjs');

const { sequelize } = require('../config/database');
const User = require('./user.model');
const Property = require('./property.model');

const syncModels = async () => {
  // alter keeps existing data and updates tables during development.
  await sequelize.sync({ alter: true });
};

const seedAdminUser = async () => {
  const adminEmail = 'admin@test.com';
  const adminPassword = '123456';

  const existingAdmin = await User.findOne({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: 'Admin User',
    email: adminEmail,
    password: hashedPassword,
  });
};

module.exports = {
  sequelize,
  User,
  Property,
  syncModels,
  seedAdminUser,
};

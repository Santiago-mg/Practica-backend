require('dotenv').config();

const buildApp = require('./app');
const env = require('./config/env');
const { connectDatabase } = require('./infrastructure/database/sequelize');
const syncModels = require('./infrastructure/database/syncModels');
const seedAdminUser = require('./infrastructure/database/seedAdminUser');

const startServer = async () => {
  try {
    await connectDatabase();
    await syncModels();

    const { app, container } = buildApp();

    // Seed the admin user reusing the same repository + password service
    // that the rest of the app will use.
    await seedAdminUser({
      userRepository: container.userRepository,
      passwordService: container.passwordService,
    });

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
};

startServer();

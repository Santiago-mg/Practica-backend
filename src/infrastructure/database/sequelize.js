const { Sequelize } = require('sequelize');

const env = require('../../config/env');

/**
 * Sequelize connection instance.
 *
 * The infrastructure layer is the only place that knows about Sequelize
 * and the database driver. The application and domain layers do NOT
 * import from here.
 */
const sequelize = new Sequelize(
  env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/real_estate_api',
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      // Supabase requires SSL for external PostgreSQL connections.
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

/**
 * Authenticate the database connection at startup.
 */
const connectDatabase = async () => {
  if (!env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is required. Add your Supabase PostgreSQL URL to the .env file.'
    );
  }

  await sequelize.authenticate();
};

module.exports = {
  sequelize,
  connectDatabase,
};

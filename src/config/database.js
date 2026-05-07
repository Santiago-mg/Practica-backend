const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(
  databaseUrl || 'postgresql://postgres:postgres@localhost:5432/real_estate_api',
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

const connectDatabase = async () => {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required. Add your Supabase PostgreSQL URL to the .env file.');
  }

  await sequelize.authenticate();
};

module.exports = {
  sequelize,
  connectDatabase,
};

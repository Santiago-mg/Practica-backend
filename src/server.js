require('dotenv').config();

const app = require('./app');
const { connectDatabase } = require('./config/database');
const { seedAdminUser, syncModels } = require('./models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDatabase();
    await syncModels();
    await seedAdminUser();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
};

startServer();

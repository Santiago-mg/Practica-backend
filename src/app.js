const express = require('express');

const authRoutes = require('./routes/auth.routes');
const {
  errorMiddleware,
  notFoundMiddleware,
} = require('./middlewares/error.middleware');
const propertyRoutes = require('./routes/property.routes');

const app = express();

// Allows Express to read JSON bodies from incoming requests.
app.use(express.json());

// Temporary health route to verify that the API is running.
app.get('/', (req, res) => {
  res.json({
    message: 'Real Estate API is running',
  });
});

// API version 1 routes.
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

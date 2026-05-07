const express = require('express');

const buildContainer = require('./container');
const {
  errorMiddleware,
  notFoundMiddleware,
} = require('./interfaces/http/middlewares/error.middleware');

/**
 * Build the Express application.
 *
 * Calling buildContainer() resolves all dependencies in one shot.
 * The app then only sees finished routers and middlewares.
 */
const buildApp = () => {
  const container = buildContainer();
  const app = express();

  app.use(express.json());

  // Health route to quickly verify the API is up.
  app.get('/', (req, res) => {
    res.json({ message: 'Real Estate API is running' });
  });

  // API v1 routes
  app.use('/api/v1/auth', container.authRouter);
  app.use('/api/v1/properties', container.propertyRouter);

  // 404 + central error handler
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return { app, container };
};

module.exports = buildApp;

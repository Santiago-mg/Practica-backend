/**
 * Composition root (a.k.a. dependency injection container).
 *
 * THIS IS THE ONLY PLACE where the layers are wired together.
 * Reading this file from top to bottom shows the full dependency graph
 * of the app, which is great for understanding and for sustentation.
 *
 * Order:
 *   1. Read environment.
 *   2. Build infrastructure (repositories) and application services
 *      (PasswordService, TokenService).
 *   3. Build use cases injecting those.
 *   4. Build HTTP layer (controllers, middlewares, routes) injecting
 *      the use cases.
 */
const env = require('./config/env');

// Infrastructure
const SequelizeUserRepository = require('./infrastructure/repositories/SequelizeUserRepository');
const SequelizePropertyRepository = require('./infrastructure/repositories/SequelizePropertyRepository');

// Application services
const PasswordService = require('./application/services/PasswordService');
const TokenService = require('./application/services/TokenService');

// Use cases
const LoginUserUseCase = require('./application/use-cases/auth/LoginUserUseCase');
const GetAllPropertiesUseCase = require('./application/use-cases/properties/GetAllPropertiesUseCase');
const GetPropertyByIdUseCase = require('./application/use-cases/properties/GetPropertyByIdUseCase');
const CreatePropertyUseCase = require('./application/use-cases/properties/CreatePropertyUseCase');
const UpdatePropertyUseCase = require('./application/use-cases/properties/UpdatePropertyUseCase');
const DeletePropertyUseCase = require('./application/use-cases/properties/DeletePropertyUseCase');

// Interfaces (HTTP)
const buildAuthMiddleware = require('./interfaces/http/middlewares/auth.middleware');
const buildAuthController = require('./interfaces/http/controllers/auth.controller');
const buildPropertyController = require('./interfaces/http/controllers/property.controller');
const buildAuthRoutes = require('./interfaces/http/routes/auth.routes');
const buildPropertyRoutes = require('./interfaces/http/routes/property.routes');

const buildContainer = () => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required. Add it to the .env file.');
  }

  // Repositories (infrastructure)
  const userRepository = new SequelizeUserRepository();
  const propertyRepository = new SequelizePropertyRepository();

  // Application services
  const passwordService = new PasswordService();
  const tokenService = new TokenService({
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  });

  // Use cases
  const loginUserUseCase = new LoginUserUseCase({
    userRepository,
    passwordService,
    tokenService,
  });
  const getAllPropertiesUseCase = new GetAllPropertiesUseCase({ propertyRepository });
  const getPropertyByIdUseCase = new GetPropertyByIdUseCase({ propertyRepository });
  const createPropertyUseCase = new CreatePropertyUseCase({ propertyRepository });
  const updatePropertyUseCase = new UpdatePropertyUseCase({ propertyRepository });
  const deletePropertyUseCase = new DeletePropertyUseCase({ propertyRepository });

  // HTTP middlewares and controllers
  const authMiddleware = buildAuthMiddleware({ tokenService });
  const authController = buildAuthController({ loginUserUseCase });
  const propertyController = buildPropertyController({
    getAllPropertiesUseCase,
    getPropertyByIdUseCase,
    createPropertyUseCase,
    updatePropertyUseCase,
    deletePropertyUseCase,
  });

  // Routers
  const authRouter = buildAuthRoutes({ authController });
  const propertyRouter = buildPropertyRoutes({ propertyController, authMiddleware });

  return {
    // exposed for app.js
    authRouter,
    propertyRouter,

    // exposed for the seed function in server.js
    userRepository,
    passwordService,
  };
};

module.exports = buildContainer;

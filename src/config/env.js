/**
 * Centralized environment variables.
 *
 * dotenv is loaded once in server.js; this module just reads
 * process.env values into a plain object so the rest of the app
 * does not access process.env directly.
 */
module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};

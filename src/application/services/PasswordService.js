const bcrypt = require('bcryptjs');

/**
 * PasswordService.
 *
 * Wraps bcryptjs so the rest of the app does not depend on it directly.
 * If we ever change the hashing library, we only change this file.
 */
class PasswordService {
  /**
   * Hash a plain password.
   * @param {string} plainPassword
   * @returns {Promise<string>}
   */
  async hash(plainPassword) {
    return bcrypt.hash(plainPassword, 10);
  }

  /**
   * Compare a plain password against a hashed password.
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {Promise<boolean>}
   */
  async compare(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = PasswordService;

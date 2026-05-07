const jwt = require('jsonwebtoken');

/**
 * TokenService.
 *
 * Wraps jsonwebtoken. Receives the secret and the expiration time
 * via constructor (dependency injection) so it does not read
 * process.env directly.
 */
class TokenService {
  constructor({ secret, expiresIn = '1h' }) {
    if (!secret) {
      throw new Error('TokenService requires a secret');
    }

    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  /**
   * Generate a JWT for a user.
   * Only safe data goes inside the token (never the password).
   *
   * @param {{ id: number, email: string }} payload
   * @returns {string}
   */
  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  /**
   * Verify and decode a JWT.
   * Throws if the token is invalid or expired.
   *
   * @param {string} token
   * @returns {object}
   */
  verify(token) {
    return jwt.verify(token, this.secret);
  }
}

module.exports = TokenService;

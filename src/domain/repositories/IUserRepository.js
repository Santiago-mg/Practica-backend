/**
 * User repository interface (contract).
 *
 * In JavaScript we don't have real interfaces, so we use an abstract class
 * that throws if a method is not implemented. This is enough for academic
 * purposes and makes the contract explicit.
 *
 * The application layer will depend on THIS contract,
 * not on the Sequelize implementation. That's the dependency inversion idea.
 */
class IUserRepository {
  /**
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    throw new Error('IUserRepository.findByEmail must be implemented');
  }

  /**
   * @param {{ name: string, email: string, password: string }} userData
   * @returns {Promise<User>}
   */
  async create(userData) {
    throw new Error('IUserRepository.create must be implemented');
  }
}

module.exports = IUserRepository;

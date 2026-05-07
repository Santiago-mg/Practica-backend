/**
 * GetPropertyByIdUseCase.
 *
 * Returns a property by its id, or null if it does not exist.
 * The HTTP layer turns null into a 404.
 */
class GetPropertyByIdUseCase {
  constructor({ propertyRepository }) {
    this.propertyRepository = propertyRepository;
  }

  /**
   * @param {number} id
   * @returns {Promise<Property|null>}
   */
  async execute(id) {
    return this.propertyRepository.findById(id);
  }
}

module.exports = GetPropertyByIdUseCase;

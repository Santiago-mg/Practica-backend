/**
 * UpdatePropertyUseCase.
 *
 * Updates an existing property. Returns null if it does not exist
 * so the HTTP layer can answer 404.
 */
class UpdatePropertyUseCase {
  constructor({ propertyRepository }) {
    this.propertyRepository = propertyRepository;
  }

  /**
   * @param {number} id
   * @param {object} propertyData
   * @returns {Promise<Property|null>}
   */
  async execute(id, propertyData) {
    return this.propertyRepository.update(id, propertyData);
  }
}

module.exports = UpdatePropertyUseCase;

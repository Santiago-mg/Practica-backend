/**
 * DeletePropertyUseCase.
 *
 * Deletes a property by id. Returns the deleted entity (or null if not found)
 * so the HTTP layer can confirm what was removed.
 */
class DeletePropertyUseCase {
  constructor({ propertyRepository }) {
    this.propertyRepository = propertyRepository;
  }

  /**
   * @param {number} id
   * @returns {Promise<Property|null>}
   */
  async execute(id) {
    return this.propertyRepository.delete(id);
  }
}

module.exports = DeletePropertyUseCase;

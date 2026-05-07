/**
 * CreatePropertyUseCase.
 *
 * Creates a new property. Validation already happened in the HTTP layer
 * (Joi middleware), so here we trust the input shape.
 */
class CreatePropertyUseCase {
  constructor({ propertyRepository }) {
    this.propertyRepository = propertyRepository;
  }

  /**
   * @param {{ title: string, price: number, location: string, available: boolean }} propertyData
   * @returns {Promise<Property>}
   */
  async execute(propertyData) {
    return this.propertyRepository.create(propertyData);
  }
}

module.exports = CreatePropertyUseCase;

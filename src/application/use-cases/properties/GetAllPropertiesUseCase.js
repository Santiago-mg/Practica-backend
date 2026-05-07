/**
 * GetAllPropertiesUseCase.
 *
 * Returns paginated and filtered properties.
 * The filtering and pagination logic actually lives in the repository
 * (because it is closer to the data source); this use case just orchestrates.
 */
class GetAllPropertiesUseCase {
  constructor({ propertyRepository }) {
    this.propertyRepository = propertyRepository;
  }

  /**
   * @param {{ location?: string, minPrice?: number, maxPrice?: number, page: number, limit: number }} filters
   * @returns {Promise<{ data: Property[], total: number, page: number, limit: number }>}
   */
  async execute(filters) {
    return this.propertyRepository.findAll(filters);
  }
}

module.exports = GetAllPropertiesUseCase;

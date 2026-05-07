/**
 * Property repository interface (contract).
 *
 * Defines what operations the application layer can ask for properties,
 * without exposing HOW (Sequelize, raw SQL, in-memory, etc).
 */
class IPropertyRepository {
  /**
   * @param {{ location?: string, minPrice?: number, maxPrice?: number, page: number, limit: number }} filters
   * @returns {Promise<{ data: Property[], total: number, page: number, limit: number }>}
   */
  async findAll(filters) {
    throw new Error('IPropertyRepository.findAll must be implemented');
  }

  /**
   * @param {number} id
   * @returns {Promise<Property|null>}
   */
  async findById(id) {
    throw new Error('IPropertyRepository.findById must be implemented');
  }

  /**
   * @param {{ title: string, price: number, location: string, available: boolean }} propertyData
   * @returns {Promise<Property>}
   */
  async create(propertyData) {
    throw new Error('IPropertyRepository.create must be implemented');
  }

  /**
   * @param {number} id
   * @param {object} propertyData
   * @returns {Promise<Property|null>}
   */
  async update(id, propertyData) {
    throw new Error('IPropertyRepository.update must be implemented');
  }

  /**
   * @param {number} id
   * @returns {Promise<Property|null>}
   */
  async delete(id) {
    throw new Error('IPropertyRepository.delete must be implemented');
  }
}

module.exports = IPropertyRepository;

/**
 * Property entity (pure domain object).
 *
 * Represents a real estate property in the business domain.
 * No Sequelize, no Express, no framework dependencies here.
 */
class Property {
  constructor({ id, title, price, location, available }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.location = location;
    this.available = available;
  }
}

module.exports = Property;

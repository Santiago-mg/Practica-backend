/**
 * User entity (pure domain object).
 *
 * No knows nothing about Sequelize, Express, JWT or any framework.
 * It only represents the concept of "User" inside the business domain.
 *
 * Why? In Clean Architecture the domain is the most stable layer.
 * If tomorrow we change the ORM or the database, this file does NOT change.
 */
class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // hashed password (never in plain text)
  }
}

module.exports = User;

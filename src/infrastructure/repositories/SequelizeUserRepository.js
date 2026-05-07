const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
const UserModel = require('../models/UserModel');

/**
 * Sequelize implementation of IUserRepository.
 *
 * Translates Sequelize model instances into domain entities (User)
 * so the application layer never sees a Sequelize object.
 */
class SequelizeUserRepository extends IUserRepository {
  async findByEmail(email) {
    const record = await UserModel.findOne({ where: { email } });

    if (!record) {
      return null;
    }

    return new User({
      id: record.id,
      name: record.name,
      email: record.email,
      password: record.password,
    });
  }

  async create(userData) {
    const record = await UserModel.create(userData);

    return new User({
      id: record.id,
      name: record.name,
      email: record.email,
      password: record.password,
    });
  }
}

module.exports = SequelizeUserRepository;

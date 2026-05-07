/**
 * Seed an admin user if it does not exist yet.
 *
 * Receives the userRepository and passwordService via parameters.
 * That way the seed function does not import bcrypt or Sequelize directly,
 * keeping the same dependency-injection style as the use cases.
 */
const seedAdminUser = async ({ userRepository, passwordService }) => {
  const adminEmail = 'admin@test.com';
  const adminPassword = '123456';

  const existingAdmin = await userRepository.findByEmail(adminEmail);

  if (existingAdmin) {
    return;
  }

  const hashedPassword = await passwordService.hash(adminPassword);

  await userRepository.create({
    name: 'Admin User',
    email: adminEmail,
    password: hashedPassword,
  });
};

module.exports = seedAdminUser;

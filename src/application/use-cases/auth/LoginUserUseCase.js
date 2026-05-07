/**
 * LoginUserUseCase.
 *
 * Application use case (interactor) for login.
 *
 * Receives its dependencies (userRepository, passwordService, tokenService)
 * via constructor. This is dependency injection: the use case does NOT
 * know which concrete implementation it gets.
 *
 * Returns the JWT string when credentials are valid, or null otherwise.
 * The HTTP layer is responsible for transforming null into a 401 response.
 */
class LoginUserUseCase {
  constructor({ userRepository, passwordService, tokenService }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
  }

  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<string|null>}
   */
  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.passwordService.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return this.tokenService.sign({
      id: user.id,
      email: user.email,
    });
  }
}

module.exports = LoginUserUseCase;

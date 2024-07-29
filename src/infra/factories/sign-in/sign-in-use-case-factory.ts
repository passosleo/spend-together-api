import { SignInUseCase } from '../../../application/use-cases/sign-in/sign-in-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';
import { AuthService } from '../../services/auth/auth-service';
import { JWTService } from '../../services/auth/jwt-service';

export class SignInUseCaseFactory {
  public static create(): SignInUseCase {
    const userRepository = new UserRepositoryPrisma();
    const helpers = new Helpers();
    const authService = new AuthService(userRepository, helpers);
    const tokenService = new JWTService();
    return new SignInUseCase(authService, tokenService);
  }
}

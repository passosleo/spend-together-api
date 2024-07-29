import { VerifyEmailUseCase } from '../../../application/use-cases/sign-up/verify-email-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';

export class VerifyEmailUseCaseFactory {
  public static create(): VerifyEmailUseCase {
    const userRepository = new UserRepositoryPrisma();
    const helpers = new Helpers();
    return new VerifyEmailUseCase(userRepository, helpers);
  }
}

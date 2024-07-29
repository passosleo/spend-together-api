import { RecoverPasswordUseCase } from '../../../application/use-cases/sign-in/recover-password-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';

export class RecoverPasswordUseCaseFactory {
  public static create(): RecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const helpers = new Helpers();
    return new RecoverPasswordUseCase(userRepository, helpers);
  }
}

import { UpdateUserUseCase } from '../../../application/use-cases/user/update-user-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';

export class UpdateUserUseCaseFactory {
  public static create(userAccount: UserAccountDTO): UpdateUserUseCase {
    const authProvider = new AuthProvider(userAccount);
    const userRepository = new UserRepositoryPrisma();
    return new UpdateUserUseCase(authProvider, userRepository);
  }
}

import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { DeleteUserAccountUseCase } from '../../../application/use-cases/user/delete-user-account-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class DeleteUserAccountUseCaseFactory {
  public static create(userAccount: UserAccountDTO): DeleteUserAccountUseCase {
    const authProvider = new AuthProvider(userAccount);
    const userRepository = new UserRepositoryPrisma();
    return new DeleteUserAccountUseCase(authProvider, userRepository);
  }
}

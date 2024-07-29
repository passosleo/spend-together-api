import { SearchUserUseCase } from '../../../application/use-cases/user/search-user-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class SearchUserUseCaseFactory {
  public static create(userAccount: UserAccountDTO): SearchUserUseCase {
    const authProvider = new AuthProvider(userAccount);
    const userRepository = new UserRepositoryPrisma();
    return new SearchUserUseCase(authProvider, userRepository);
  }
}

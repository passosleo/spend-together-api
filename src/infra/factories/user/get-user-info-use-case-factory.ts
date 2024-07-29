import { GetUserInfoUseCase } from '../../../application/use-cases/user/get-user-info-use-case';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class GetUserInfoUseCaseFactory {
  public static create(userAccount: UserAccountDTO): GetUserInfoUseCase {
    const authProvider = new AuthProvider(userAccount);
    const userRepository = new UserRepositoryPrisma();
    return new GetUserInfoUseCase(authProvider, userRepository);
  }
}

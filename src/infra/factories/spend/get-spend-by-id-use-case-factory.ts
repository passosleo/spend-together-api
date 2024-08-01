import { GetSpendByIdUseCase } from '../../../application/use-cases/spend/get-spend-by-id-use-case';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class GetSpendByIdUseCaseFactory {
  public static create(userAccount: UserAccountDTO): GetSpendByIdUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendRepository = new SpendRepositoryPrisma();
    return new GetSpendByIdUseCase(authProvider, spendRepository);
  }
}

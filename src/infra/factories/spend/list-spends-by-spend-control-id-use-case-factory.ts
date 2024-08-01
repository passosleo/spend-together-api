import { ListSpendsBySpendControlIdUseCase } from '../../../application/use-cases/spend/list-spends-by-spend-control-id-use-case';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class ListSpendsBySpendControlIdUseCaseFactory {
  public static create(userAccount: UserAccountDTO): ListSpendsBySpendControlIdUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendRepository = new SpendRepositoryPrisma();
    return new ListSpendsBySpendControlIdUseCase(authProvider, spendRepository);
  }
}

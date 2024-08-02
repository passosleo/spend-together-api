import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { ListSpendControlsSummaryUseCase } from '../../../application/use-cases/spend-control/list-spend-controls-summary-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';

export class ListSpendControlsSummaryUseCaseFactory {
  public static create(userAccount: UserAccountDTO): ListSpendControlsSummaryUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlRepository = new SpendControlRepositoryPrisma();
    return new ListSpendControlsSummaryUseCase(authProvider, spendControlRepository);
  }
}

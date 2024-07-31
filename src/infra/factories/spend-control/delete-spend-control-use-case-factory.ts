import { DeleteSpendControlUseCase } from '../../../application/use-cases/spend-control/delete-spend-control-use-case';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class DeleteSpendControlUseCaseFactory {
  public static create(userAccount: UserAccountDTO): DeleteSpendControlUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlRepository = new SpendControlRepositoryPrisma();
    return new DeleteSpendControlUseCase(authProvider, spendControlRepository);
  }
}

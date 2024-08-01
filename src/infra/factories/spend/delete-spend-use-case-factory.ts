import { DeleteSpendUseCase } from '../../../application/use-cases/spend/delete-spend-use-case';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class DeleteSpendUseCaseFactory {
  public static create(userAccount: UserAccountDTO): DeleteSpendUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendRepository = new SpendRepositoryPrisma();
    return new DeleteSpendUseCase(authProvider, spendRepository);
  }
}

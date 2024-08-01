import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { CreateSpendUseCase } from '../../../application/use-cases/spend/create-spend-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendCategoryRepositoryPrisma } from '../../data/repositories/spend-category-repository-prisma';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';

export class CreateSpendUseCaseFactory {
  public static create(userAccount: UserAccountDTO): CreateSpendUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendRepository = new SpendRepositoryPrisma();
    const spendControlRepository = new SpendControlRepositoryPrisma();
    const spendCategoryRepository = new SpendCategoryRepositoryPrisma();
    return new CreateSpendUseCase(authProvider, spendRepository, spendControlRepository, spendCategoryRepository);
  }
}

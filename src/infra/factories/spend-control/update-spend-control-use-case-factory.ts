import { UpdateSpendControlUseCase } from '../../../application/use-cases/spend-control/update-spend-control-use-case';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';
import { SpendCalculatorService } from '../../services/spend/spend-calculator-service';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { Helpers } from '../../helpers';

export class UpdateSpendControlUseCaseFactory {
  public static create(userAccount: UserAccountDTO): UpdateSpendControlUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlRepository = new SpendControlRepositoryPrisma();
    const spendRepository = new SpendRepositoryPrisma();
    const helpers = new Helpers();
    const spendCalculatorService = new SpendCalculatorService(spendRepository, helpers);
    return new UpdateSpendControlUseCase(authProvider, spendControlRepository, spendCalculatorService);
  }
}

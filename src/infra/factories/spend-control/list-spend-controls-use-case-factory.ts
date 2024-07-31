import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { ListSpendControlsUseCase } from '../../../application/use-cases/spend-control/list-spend-controls-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';
import { Helpers } from '../../helpers';
import { SpendCalculatorService } from '../../services/spend/spend-calculator-service';

export class ListSpendControlsUseCaseFactory {
  public static create(userAccount: UserAccountDTO): ListSpendControlsUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlRepository = new SpendControlRepositoryPrisma();
    const spendRepository = new SpendRepositoryPrisma();
    const helpers = new Helpers();
    const spendCalculatorService = new SpendCalculatorService(spendRepository, helpers);
    return new ListSpendControlsUseCase(authProvider, spendControlRepository, spendCalculatorService);
  }
}

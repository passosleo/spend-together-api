import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { GetSpendControlByIdUseCase } from '../../../application/use-cases/spend-control/get-spend-control-by-id-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';
import { SpendRepositoryPrisma } from '../../data/repositories/spend-repository-prisma';
import { Helpers } from '../../helpers';
import { SpendCalculatorService } from '../../services/spend/spend-calculator-service';

export class GetSpendControlByIdUseCaseFactory {
  public static create(userAccount: UserAccountDTO): GetSpendControlByIdUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlRepository = new SpendControlRepositoryPrisma();
    const spendRepository = new SpendRepositoryPrisma();
    const helpers = new Helpers();
    const spendCalculatorService = new SpendCalculatorService(spendRepository, helpers);
    return new GetSpendControlByIdUseCase(authProvider, spendControlRepository, spendCalculatorService);
  }
}

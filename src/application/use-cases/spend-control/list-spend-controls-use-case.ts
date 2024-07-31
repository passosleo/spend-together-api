import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { SpendControlResponseDTO } from '../../../infra/http/dtos/spend-control/spend-control-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';
import { ISpendCalculatorService } from '../../services/spend/spend-calculator-service.types';

export class ListSpendControlsUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
    private readonly spendCalculatorService: ISpendCalculatorService,
  ) {}

  public async execute(): Promise<SpendControlResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControls = await this.spendControlRepository.findAll(userAccount.userId);

    const spendControlsWithBalance = await Promise.all(
      spendControls.map(async (spendControl) => {
        const balance = await this.spendCalculatorService.calculateBalance(spendControl, userAccount.userId);

        return SpendControlResponseDTO.create({
          ...spendControl,
          ...balance,
        });
      }),
    );

    return spendControlsWithBalance;
  }
}

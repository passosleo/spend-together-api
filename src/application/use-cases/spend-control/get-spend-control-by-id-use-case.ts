import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendControl } from '../../../domain/entities/spend-control/spend-control';
import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { Exception } from '../../../infra/exception';
import { SpendControlResponseDTO } from '../../../infra/http/dtos/spend-control/spend-control-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';
import { ISpendCalculatorService } from '../../services/spend/spend-calculator-service.types';

export class GetSpendControlByIdUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
    private readonly spendCalculatorService: ISpendCalculatorService,
  ) {}

  public async execute(spendControlId: string): Promise<SpendControlResponseDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControl = await this.spendControlRepository.findOne(spendControlId, userAccount.userId);

    if (!spendControl) {
      throw new Exception('NOT_FOUND', 'Spend Control not found');
    }

    const balance = await this.spendCalculatorService.calculateBalance(spendControl, userAccount.userId);

    if (!this.canUserAccessSpendControl(spendControl, userAccount)) {
      throw new Exception('FORBIDDEN', 'User cannot access this spend control');
    }

    return SpendControlResponseDTO.create({
      ...spendControl,
      ...balance,
    });
  }

  private canUserAccessSpendControl(spendControl: SpendControl, user: UserAccountDTO) {
    if (spendControl.users.length > 1) {
      const currentUser = spendControl.users.find((item) => item.user.userId === user.userId);
      if (currentUser && !currentUser.isOwner && !currentUser.joinedAt) {
        return false;
      }
    }
    return true;
  }
}

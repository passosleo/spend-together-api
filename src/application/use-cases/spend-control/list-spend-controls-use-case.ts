import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendControl } from '../../../domain/entities/spend-control/spend-control';
import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';
import { SpendControlResponseDTO } from '../../../infra/http/dtos/spend-control/spend-control-response-dto';
import { IHelpers } from '../../helpers/helpers.types';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ListSpendControlsUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
    private readonly spendRepository: ISpendRepository,
    private readonly helpers: IHelpers,
  ) {}

  public async execute(): Promise<SpendControlResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControls = await this.spendControlRepository.findAll(userAccount.userId);

    const spendControlsWithBalance = await Promise.all(
      spendControls.map(async (spendControl) => {
        console.log(
          'ListSpendControlsUseCase ~ spendControls.map ~ spendControl',
          JSON.stringify(spendControl, null, 2),
        );
        const balance = await this.calculateBalance(spendControl, userAccount);

        return SpendControlResponseDTO.create({
          ...spendControl,
          ...balance,
        });
      }),
    );

    return spendControlsWithBalance;
  }

  private async calculateBalance(spendControl: SpendControl, user: UserAccountDTO) {
    const otherUser = spendControl.users.find((item) => item.user.userId !== user.userId);

    const totalByUsers = await Promise.all([
      this.spendRepository.sumTotalSpent(spendControl.spendControlId, user.userId),
      otherUser ? this.spendRepository.sumTotalSpent(spendControl.spendControlId, otherUser.user.userId) : 0,
    ]);

    const [totalSpentByUser, totalSpentByOtherUser] = totalByUsers.map((total) =>
      this.helpers.number.formatDecimal(total),
    );

    const totalSpent = this.helpers.number.formatDecimal(totalSpentByUser + totalSpentByOtherUser);
    const balance = this.helpers.number.formatDecimal(totalSpentByUser - totalSpentByOtherUser);

    return {
      balance,
      totalSpent,
      totalSpentByUser,
      totalSpentByOtherUser,
    };
  }
}

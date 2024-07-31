import { IHelpers } from '../../../application/helpers/helpers.types';
import { ISpendCalculatorService } from '../../../application/services/spend/spend-calculator-service.types';
import { SpendControl } from '../../../domain/entities/spend-control/spend-control';
import { SpendBalance } from '../../../domain/entities/spend/spend-balance';
import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';

export class SpendCalculatorService implements ISpendCalculatorService {
  constructor(
    private readonly spendRepository: ISpendRepository,
    private readonly helpers: IHelpers,
  ) {}

  public async calculateBalance(spendControl: SpendControl, userId: string): Promise<SpendBalance> {
    const otherUser = spendControl.users.find((item) => item.user.userId !== userId);

    const totalByUsers = await Promise.all([
      this.spendRepository.sumTotalSpent(spendControl.spendControlId, userId),
      otherUser ? this.spendRepository.sumTotalSpent(spendControl.spendControlId, otherUser.user.userId) : 0,
    ]);

    const [totalSpentByUser, totalSpentByOthers] = totalByUsers.map((total) =>
      this.helpers.number.formatDecimal(total),
    );

    const totalSpent = this.helpers.number.formatDecimal(totalSpentByUser + totalSpentByOthers);
    const balance = this.helpers.number.formatDecimal(totalSpentByUser - totalSpentByOthers);

    return SpendBalance.create({
      balance,
      totalSpent,
      totalSpentByUser,
      totalSpentByOthers,
    });
  }
}

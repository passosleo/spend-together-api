import { SpendControl } from '../../../domain/entities/spend-control/spend-control';
import { SpendBalance } from '../../../domain/entities/spend/spend-balance';

export interface ISpendCalculatorService {
  calculateBalance(spendControl: SpendControl, userId: string): Promise<SpendBalance>;
}

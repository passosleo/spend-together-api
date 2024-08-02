import { SpendControl } from '../../entities/spend-control/spend-control';
import { SpendControlSummary } from '../../entities/spend-control/spend-control-summary';

export interface ISpendControlRepository {
  findOne(spendControlId: string, userId: string): Promise<SpendControl | null>;
  findAll(userId: string): Promise<SpendControl[]>;
  create(data: SpendControl): Promise<SpendControl>;
  update(spendControlId: string, userId: string, data: Partial<SpendControl>): Promise<SpendControl>;
  delete(spendControlId: string): Promise<SpendControl>;
  getSummary(userId: string): Promise<SpendControlSummary[]>;
}

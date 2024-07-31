import { Spend } from '../../entities/spend/spend';

export interface ISpendRepository {
  findOne(spendId: string, userId: string): Promise<Spend | null>;
  findAll(spendControlId: string, userId: string): Promise<Spend[]>;
  create(data: Spend): Promise<Spend>;
  update(spendId: string, data: Partial<Spend>): Promise<Spend>;
  delete(spendId: string, userId: string): Promise<Spend>;
  sumTotalSpent(spendControlId: string, userId?: string): Promise<number>;
}

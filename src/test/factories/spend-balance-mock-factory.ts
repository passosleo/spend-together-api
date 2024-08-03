import { faker } from '@faker-js/faker';
import { SpendBalance } from '../../domain/entities/spend/spend-balance';

export class SpendBalanceMockFactory {
  public static createEntity(data: Partial<SpendBalance> = {}): SpendBalance {
    return SpendBalance.create({
      balance: data.balance ?? Number(faker.number.float().toFixed(2)),
      totalSpent: data.totalSpent ?? Number(faker.number.float().toFixed(2)),
      totalSpentByUser: data.totalSpentByUser ?? Number(faker.number.float().toFixed(2)),
      totalSpentByOthers: data.totalSpentByOthers ?? Number(faker.number.float().toFixed(2)),
    });
  }

  public static createEntities(amount = 10): SpendBalance[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

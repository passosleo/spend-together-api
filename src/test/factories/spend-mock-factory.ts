import { faker } from '@faker-js/faker';
import { Spend } from '../../domain/entities/spend/spend';

export class SpendMockFactory {
  public static createEntity(data: Partial<Spend> = {}): Spend {
    return Spend.create({
      spendId: data.spendId ?? faker.string.uuid(),
      spendControlId: data.spendControlId ?? faker.string.uuid(),
      spendCategoryId: data.spendCategoryId ?? faker.string.uuid(),
      userId: data.userId ?? faker.string.uuid(),
      description: data.description ?? faker.lorem.sentence(),
      amount: data.amount ?? Number(faker.number.float().toFixed(2)),
      ...data,
    });
  }

  public static createEntities(amount = 10): Spend[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

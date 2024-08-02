import { faker } from '@faker-js/faker';
import { SpendControl } from '../../domain/entities/spend-control/spend-control';
import { SpendControlUserMockFactory } from './spend-control-user-mock-factory';

export class SpendControlMockFactory {
  public static createEntity(data: Partial<SpendControl> = {}): SpendControl {
    return SpendControl.create({
      spendControlId: data.spendControlId ?? faker.string.uuid(),
      name: data.name ?? faker.lorem.word(),
      color: data.color ?? faker.color.rgb(),
      description: data.description ?? faker.lorem.sentence(),
      users: data.users ?? SpendControlUserMockFactory.createEntities(2),
      ...data,
    });
  }

  public static createEntities(amount = 10): SpendControl[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

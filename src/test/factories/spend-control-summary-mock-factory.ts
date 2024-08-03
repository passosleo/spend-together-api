import { faker } from '@faker-js/faker';
import { SpendControl } from '../../domain/entities/spend-control/spend-control';
import { SpendControlSummary } from '../../domain/entities/spend-control/spend-control-summary';

export class SpendControlSummaryMockFactory {
  public static createEntity(data: Partial<SpendControlSummary> = {}): SpendControlSummary {
    return SpendControl.create({
      spendControlId: data.spendControlId ?? faker.string.uuid(),
      name: data.name ?? faker.lorem.word(),
      description: data.description ?? faker.lorem.sentence(),
      color: data.color ?? faker.color.rgb(),
      ...data,
    });
  }

  public static createEntities(amount = 10): SpendControlSummary[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

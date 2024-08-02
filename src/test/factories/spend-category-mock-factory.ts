import { faker } from '@faker-js/faker';
import { SpendCategory } from '../../domain/entities/spend-category/spend-category';

export class SpendCategoryMockFactory {
  public static createEntity(data: Partial<SpendCategory> = {}): SpendCategory {
    return SpendCategory.create({
      spendCategoryId: data.spendCategoryId ?? faker.string.uuid(),
      name: data.name ?? faker.lorem.word(),
      color: data.color ?? faker.color.rgb(),
      description: data.description ?? faker.lorem.sentence(),
      isEnabled: data.isEnabled ?? faker.datatype.boolean(),
      createdAt: data.createdAt ?? faker.date.recent(),
      updatedAt: data.updatedAt ?? faker.date.recent(),
      ...data,
    });
  }

  public static createEntities(amount = 10): SpendCategory[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

import { SpendCategory as SpendCategoryEntity } from '@prisma/client';
import { SpendCategory } from '../../../domain/entities/spend-category/spend-category';

export class SpendCategoryMapper {
  public static toDomain(data: SpendCategoryEntity): SpendCategory {
    return SpendCategory.create(data);
  }

  public static toEntity(data: SpendCategory): SpendCategoryEntity {
    return {
      spendCategoryId: data.spendCategoryId,
      name: data.name,
      description: data.description,
      color: data.color,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

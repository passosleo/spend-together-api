import { Spend as SpendEntity } from '@prisma/client';
import { Spend } from '../../../domain/entities/spend/spend';

export class SpendMapper {
  public static toDomain(data: SpendEntity): Spend {
    return Spend.create(data);
  }

  public static toEntity(data: Spend): SpendEntity {
    return {
      spendId: data.spendId,
      spendControlId: data.spendControlId,
      spendCategoryId: data.spendCategoryId,
      userId: data.userId,
      amount: data.amount,
      description: data.description,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialEntity(data: Partial<Spend>): Partial<SpendEntity> {
    return {
      spendId: data.spendId,
      spendControlId: data.spendControlId,
      spendCategoryId: data.spendCategoryId,
      userId: data.userId,
      amount: data.amount,
      description: data.description,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

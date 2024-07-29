import { SpendControl as SpendControlEntity } from '@prisma/client';
import { SpendControl } from '../../../domain/entities/spend-control/spend-control';

export class SpendControlMapper {
  public static toDomain(data: SpendControlEntity): SpendControl {
    return SpendControl.create(data);
  }

  public static toEntity(data: SpendControl): SpendControlEntity {
    return {
      spendControlId: data.spendControlId,
      name: data.name,
      color: data.color,
      description: data.description,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialEntity(data: Partial<SpendControl>): Partial<SpendControlEntity> {
    return {
      spendControlId: data.spendControlId,
      name: data.name,
      color: data.color,
      description: data.description,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

import { SpendControl as SpendControlEntity } from '@prisma/client';
import { SpendControlSummary } from '../../../domain/entities/spend-control/spend-control-summary';

export class SpendControlSummaryMapper {
  public static toDomain(data: SpendControlEntity): SpendControlSummary {
    return SpendControlSummary.create(data);
  }

  public static toEntity(data: SpendControlSummary): SpendControlEntity {
    return {
      spendControlId: data.spendControlId,
      name: data.name,
      color: data.color,
      description: data.description,
      isEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public static toPartialEntity(data: Partial<SpendControlSummary>): Partial<SpendControlEntity> {
    return {
      spendControlId: data.spendControlId,
      name: data.name,
      color: data.color,
      description: data.description,
      isEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

import { SpendControlInvite as SpendControlInviteEntity } from '@prisma/client';
import { SpendControlInvite } from '../../../domain/entities/spend-control-invite/spend-control-invite';

export class SpendControlInviteMapper {
  public static toDomain(data: SpendControlInviteEntity): SpendControlInvite {
    return SpendControlInvite.create(data);
  }

  public static toEntity(data: SpendControlInvite): SpendControlInviteEntity {
    return {
      spendControlInviteId: data.spendControlInviteId,
      spendControlId: data.spendControlId,
      ownerUserId: data.ownerUserId,
      invitedUserId: data.invitedUserId,
      isAccepted: data.isAccepted,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialEntity(data: Partial<SpendControlInvite>): Partial<SpendControlInviteEntity> {
    return {
      spendControlInviteId: data.spendControlInviteId,
      spendControlId: data.spendControlId,
      ownerUserId: data.ownerUserId,
      invitedUserId: data.invitedUserId,
      isAccepted: data.isAccepted,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

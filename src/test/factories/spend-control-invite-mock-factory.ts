import { faker } from '@faker-js/faker';
import { SpendControlInvite } from '../../domain/entities/spend-control-invite/spend-control-invite';

export class SpendControlInviteMockFactory {
  public static createEntity(data: Partial<SpendControlInvite> = {}): SpendControlInvite {
    return SpendControlInvite.create({
      spendControlInviteId: data.spendControlInviteId ?? faker.string.uuid(),
      spendControlId: data.spendControlId ?? faker.string.uuid(),
      ownerUserId: data.ownerUserId ?? faker.string.uuid(),
      invitedUserId: data.invitedUserId ?? faker.string.uuid(),
      ...data,
    });
  }

  public static createEntities(amount = 10): SpendControlInvite[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

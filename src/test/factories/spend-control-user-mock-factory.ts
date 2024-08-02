import { faker } from '@faker-js/faker';
import { SpendControlUser } from '../../domain/entities/spend-control/spend-control-user';
import { UserSummaryMockFactory } from './user-summary-mock-factory';

export class SpendControlUserMockFactory {
  public static createEntity(data: Partial<SpendControlUser> = {}): SpendControlUser {
    return SpendControlUser.create({
      user: data.user ?? UserSummaryMockFactory.createEntity(),
      isOwner: data.isOwner ?? faker.datatype.boolean(),
      invitedAt: data.invitedAt ?? faker.date.recent(),
      joinedAt: data.joinedAt ?? faker.date.recent(),
      ...data,
    });
  }

  public static createEntities(amount = 10): SpendControlUser[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

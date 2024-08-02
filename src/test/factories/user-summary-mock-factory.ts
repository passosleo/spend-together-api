import { faker } from '@faker-js/faker';
import { UserSummary } from '../../domain/entities/user/user-summary';

export class UserSummaryMockFactory {
  public static createEntity(data: Partial<UserSummary> = {}): UserSummary {
    return UserSummary.create({
      userId: data.userId ?? faker.string.uuid(),
      name: data.name ?? faker.person.fullName(),
      username: data.username?.toLowerCase() ?? faker.internet.userName().toLowerCase(),
      avatar: data.avatar ?? faker.image.avatar(),
      ...data,
    });
  }

  public static createEntities(amount = 10): UserSummary[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

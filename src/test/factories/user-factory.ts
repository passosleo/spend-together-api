import { faker } from '@faker-js/faker';
import { User } from '../../domain/entities/user/user';
import { UserAccountDTO } from '../../domain/dtos/user/user-account-dto';

export class UserFactory {
  public static createAccount(data: Partial<User> = {}): UserAccountDTO {
    return UserAccountDTO.create({
      userId: data.userId || faker.string.uuid(),
      username: data.username?.toLowerCase() || faker.internet.userName().toLowerCase(),
      name: data.name || faker.internet.userName(),
      email: data.email || faker.internet.email(),
      avatar: data.avatar || faker.image.avatar(),
      emailVerified: data.emailVerified || faker.datatype.boolean(),
      receiveEmails: data.receiveEmails || faker.datatype.boolean(),
      isEnabled: data.isEnabled || faker.datatype.boolean(),
      isPublic: data.isPublic || faker.datatype.boolean(),
      createdAt: data.createdAt || faker.date.past(),
      updatedAt: data.updatedAt || faker.date.recent(),
    });
  }
}

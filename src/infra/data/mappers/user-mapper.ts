import { User as UserEntity } from '@prisma/client';
import { User } from '../../../domain/entities/user';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class UserMapper {
  public static toDomain(data: UserEntity): User {
    return User.create(data);
  }

  public static toEntity(data: User): UserEntity {
    return {
      userId: data.userId,
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      emailVerified: data.emailVerified,
      receiveEmails: data.receiveEmails,
      isPublic: data.isPublic,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialEntity(data: Partial<User>): Partial<UserEntity> {
    return {
      userId: data.userId,
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      emailVerified: data.emailVerified,
      receiveEmails: data.receiveEmails,
      isPublic: data.isPublic,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toAccount(data: User): UserAccountDTO {
    return UserAccountDTO.create(data);
  }
}

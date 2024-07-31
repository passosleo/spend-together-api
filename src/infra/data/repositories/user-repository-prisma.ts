import { UserUniqueKeyData } from '../../../domain/repositories/user/user-repository.types';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { UserMapper } from '../mappers/user-mapper';
import { User } from '../../../domain/entities/user/user';
import { prisma } from '../db';

export class UserRepositoryPrisma implements IUserRepository {
  constructor() {}

  async create(data: User): Promise<User> {
    try {
      const model = await prisma.user.create({ data: UserMapper.toEntity(data) });

      return UserMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    try {
      const model = await prisma.user.update({
        where: { userId },
        data: UserMapper.toPartialEntity(data),
      });

      return UserMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(userId: string): Promise<User> {
    try {
      const model = await prisma.user.delete({ where: { userId } });

      return UserMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const models = await prisma.user.findMany();

      return models.map((model) => UserMapper.toDomain(model));
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByUniqueKey(data: UserUniqueKeyData): Promise<User | null> {
    try {
      const model = await prisma.user.findFirst({ where: data });

      return model ? UserMapper.toDomain(model) : null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAllByUsername(username: string, excludeUsername: string, take = 5): Promise<User[]> {
    try {
      const models = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
            not: excludeUsername,
          },
        },
        take,
      });

      return models.map((model) => UserMapper.toDomain(model));
    } finally {
      await prisma.$disconnect();
    }
  }
}

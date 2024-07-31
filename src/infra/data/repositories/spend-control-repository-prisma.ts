import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { SpendControl } from '../../../domain/entities/spend-control/spend-control';
import { SpendControlMapper } from '../mappers/spend-control-mapper';
import { Prisma } from '@prisma/client';
import { prisma } from '../db';

export class SpendControlRepositoryPrisma implements ISpendControlRepository {
  private spendControlUserFields: Prisma.SpendControlUsersSelect = {
    user: {
      select: {
        userId: true,
        name: true,
        username: true,
        avatar: true,
      },
    },
    isOwner: true,
    invitedAt: true,
    joinedAt: true,
  };

  async findOne(spendControlId: string, userId: string): Promise<SpendControl | null> {
    try {
      const model = await prisma.spendControl.findFirst({
        where: {
          spendControlId,
          users: { some: { userId } },
        },
        include: {
          users: {
            select: this.spendControlUserFields,
          },
        },
      });

      return model ? SpendControlMapper.toDomain(model) : null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(userId: string): Promise<SpendControl[]> {
    try {
      const models = await prisma.spendControl.findMany({
        where: { users: { some: { userId, joinedAt: { not: null } } } },
        orderBy: { createdAt: 'desc' },
        include: {
          users: {
            select: this.spendControlUserFields,
          },
        },
      });

      return models.map((model) => SpendControlMapper.toDomain(model));
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(data: SpendControl): Promise<SpendControl> {
    try {
      const owner = data.users.find(({ isOwner }) => isOwner)!;
      const invitedUsers = data.users.filter(({ user }) => user.userId !== owner.user.userId);
      const model = await prisma.spendControl.create({
        data: {
          ...SpendControlMapper.toEntity(data),
          users: {
            create: [owner, ...invitedUsers].map((user) => ({
              userId: user.user.userId,
              isOwner: user.isOwner,
              invitedAt: user.invitedAt,
              joinedAt: user.joinedAt,
            })),
          },
          spendControlInvites: {
            create: invitedUsers.map(({ user: { userId: invitedUserId } }) => ({
              invitedUserId,
              ownerUserId: owner.user.userId,
            })),
          },
        },
        include: {
          users: {
            select: this.spendControlUserFields,
          },
        },
      });

      return SpendControlMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(spendControlId: string, userId: string, data: Partial<SpendControl>): Promise<SpendControl> {
    try {
      const model = await prisma.spendControl.update({
        where: { spendControlId, users: { some: { userId } } },
        data: SpendControlMapper.toPartialEntity(data),
        include: {
          users: {
            select: this.spendControlUserFields,
          },
        },
      });

      return new SpendControl(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(spendControlId: string): Promise<SpendControl> {
    try {
      const [, , model] = await prisma.$transaction([
        prisma.spend.deleteMany({
          where: {
            spendControlId,
          },
        }),
        prisma.spendControlUsers.deleteMany({
          where: {
            spendControlId,
          },
        }),
        prisma.spendControl.delete({
          where: {
            spendControlId,
          },
          include: {
            users: {
              select: this.spendControlUserFields,
            },
          },
        }),
      ]);

      return SpendControlMapper.toDomain(model);
    } finally {
      prisma.$disconnect();
    }
  }
}

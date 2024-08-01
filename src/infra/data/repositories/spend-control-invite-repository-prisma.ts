import { Prisma } from '@prisma/client';
import { ISpendControlInviteRepository } from '../../../domain/repositories/spenc-control-invite/spend-control-invite-repository';
import { prisma } from '../db';
import { SpendControlInvite } from '../../../domain/entities/spend-control-invite/spend-control-invite';
import { SpendControlInviteMapper } from '../mappers/spend-control-invite-mapper';

export class SpendControlInviteRepositoryPrisma implements ISpendControlInviteRepository {
  private aggregateFields: Prisma.SpendControlInviteInclude = {
    invitedUser: {
      select: {
        userId: true,
        username: true,
        name: true,
        avatar: true,
      },
    },
    ownerUser: {
      select: {
        userId: true,
        username: true,
        name: true,
        avatar: true,
      },
    },
    spendControl: {
      select: {
        spendControlId: true,
        name: true,
        description: true,
        color: true,
      },
    },
  };

  async findOne(spendControlInviteId: string, userId: string): Promise<SpendControlInvite | null> {
    try {
      const model = await prisma.spendControlInvite.findFirst({
        where: {
          spendControlInviteId,
          invitedUserId: userId,
          isEnabled: true,
        },
        include: this.aggregateFields,
      });

      return model ? SpendControlInviteMapper.toDomain(model) : null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(userId: string): Promise<SpendControlInvite[]> {
    try {
      const models = await prisma.spendControlInvite.findMany({
        where: {
          invitedUserId: userId,
          isEnabled: true,
        },
        include: this.aggregateFields,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return models.map((model) => SpendControlInviteMapper.toDomain(model));
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(data: SpendControlInvite): Promise<SpendControlInvite> {
    try {
      const model = await prisma.spendControlInvite.create({
        data: SpendControlInviteMapper.toEntity(data),
        include: this.aggregateFields,
      });

      return SpendControlInviteMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(
    spendControlInviteId: string,
    userId: string,
    data: Partial<SpendControlInvite>,
  ): Promise<SpendControlInvite> {
    try {
      const model = await prisma.$transaction(async (tx) => {
        const invite = await tx.spendControlInvite.update({
          where: {
            spendControlInviteId,
            invitedUserId: userId,
          },
          data: SpendControlInviteMapper.toPartialEntity(data),
          include: this.aggregateFields,
        });

        if (data.isAccepted) {
          await tx.spendControlUsers.update({
            where: {
              spendControlId_userId: {
                spendControlId: invite.spendControlId,
                userId,
              },
            },
            data: {
              joinedAt: new Date(),
            },
          });
        } else {
          await tx.spendControlUsers.delete({
            where: {
              spendControlId_userId: {
                spendControlId: invite.spendControlId,
                userId,
              },
            },
          });
        }

        return invite;
      });

      return SpendControlInviteMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }
}

import { Notification } from '../../../domain/entities/notification/notification';
import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { CountNotificationData } from '../../../domain/repositories/notification/notification-repository.types';
import { prisma } from '../db';
import { NotificationMapper } from '../mappers/notification-mapper';

export class NotificationRepositoryPrisma implements INotificationRepository {
  async count(userId: string, data: CountNotificationData): Promise<number> {
    try {
      return await prisma.notification.count({
        where: { ...data, userId },
      });
    } finally {
      await prisma.$disconnect();
    }
  }

  async findOne(notificationId: string, userId: string): Promise<Notification | null> {
    try {
      const model = await prisma.notification.findFirst({
        where: {
          notificationId,
          userId,
        },
      });

      return model ? NotificationMapper.toDomain(model) : null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(userId: string): Promise<Notification[]> {
    try {
      const models = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return models.map((model) => NotificationMapper.toDomain(model));
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(data: Notification): Promise<Notification> {
    try {
      const model = await prisma.notification.create({ data: NotificationMapper.toEntity(data) });

      return NotificationMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(notificationId: string, userId: string, data: Partial<Notification>): Promise<Notification> {
    try {
      const model = await prisma.notification.update({
        where: { notificationId, userId },
        data,
      });

      return NotificationMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(notificationId: string, userId: string): Promise<Notification> {
    try {
      const model = await prisma.notification.delete({
        where: { notificationId, userId },
      });

      return NotificationMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }
}

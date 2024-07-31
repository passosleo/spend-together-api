import { Notification as NotificationEntity } from '@prisma/client';
import { Notification } from '../../../domain/entities/notification/notification';

export class NotificationMapper {
  public static toDomain(data: NotificationEntity): Notification {
    return Notification.create(data);
  }

  public static toEntity(data: Notification): NotificationEntity {
    return {
      notificationId: data.notificationId,
      userId: data.userId,
      title: data.title,
      content: data.content,
      link: data.link,
      isRead: data.isRead,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

import { Notification } from '../../domain/entities/notification/notification';
import { faker } from '@faker-js/faker';

export class NotificationMockFactory {
  public static createEntity(data: Partial<Notification> = {}): Notification {
    return Notification.create({
      notificationId: data.notificationId ?? faker.string.uuid(),
      content: data.content ?? faker.lorem.sentence(),
      title: data.title ?? faker.lorem.sentence(),
      userId: data.userId ?? faker.string.uuid(),
      ...data,
    });
  }

  public static createEntities(amount = 10): Notification[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}

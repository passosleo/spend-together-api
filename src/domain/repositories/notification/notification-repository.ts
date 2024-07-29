import { Notification } from '../../entities/notification';
import { CountNotificationData } from './notification-repository.types';

export interface INotificationRepository {
  count(userId: string, params: CountNotificationData): Promise<number>;
  findOne(notificationId: string, userId: string): Promise<Notification | null>;
  findAll(userId: string): Promise<Notification[]>;
  create(data: Notification): Promise<Notification>;
  update(notificationId: string, userId: string, data: Partial<Notification>): Promise<Notification>;
  delete(notificationId: string, userId: string): Promise<Notification>;
}

import { Notification } from '../../entities/notification';
import { CountNotificationData } from './notification-repository.types';

export interface INotificationRepository {
  countByUser(userId: string, params: CountNotificationData): Promise<number>;
  findOneByUser(notificationId: string, userId: string): Promise<Notification | null>;
  findAllByUser(userId: string): Promise<Notification[]>;
  create(data: Notification): Promise<Notification>;
  updateByUser(notificationId: string, userId: string, data: Partial<Notification>): Promise<Notification>;
  deleteByUser(notificationId: string, userId: string): Promise<Notification>;
}

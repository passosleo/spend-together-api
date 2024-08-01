import { Notification } from '../../domain/entities/notification/notification';
import { INotificationRepository } from '../../domain/repositories/notification/notification-repository';
import { CountNotificationData } from '../../domain/repositories/notification/notification-repository.types';

export const NotificationRepositoryMock: jest.Mocked<INotificationRepository> = {
  count: jest.fn<Promise<number>, [string, CountNotificationData]>(),
  findOne: jest.fn<Promise<Notification | null>, [string, string]>(),
  findAll: jest.fn<Promise<Notification[]>, [string]>(),
  create: jest.fn<Promise<Notification>, [Notification]>(),
  update: jest.fn<Promise<Notification>, [string, string, Partial<Notification>]>(),
  delete: jest.fn<Promise<Notification>, [string, string]>(),
};

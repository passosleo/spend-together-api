import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { NotificationResponseDTO } from '../../../infra/http/dtos/notification/notification-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ListNotificationsUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly notificationRepository: INotificationRepository,
  ) {}

  public async execute(): Promise<NotificationResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const notifications = await this.notificationRepository.findAll(userAccount.userId);

    const setAllRead = notifications.map((notification) =>
      this.notificationRepository.update(notification.notificationId, userAccount.userId, {
        isRead: true,
      }),
    );

    await Promise.all(setAllRead);

    return notifications.map(NotificationResponseDTO.create);
  }
}

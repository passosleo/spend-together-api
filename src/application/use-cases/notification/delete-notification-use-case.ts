import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { Exception } from '../../../infra/exception';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class DeleteNotificationUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly notificationsRepository: INotificationRepository,
  ) {}

  public async execute(notificationId: string): Promise<void> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const notification = await this.notificationsRepository.findOne(notificationId, userAccount.userId);
    if (!notification) {
      throw new Exception('NOT_FOUND', 'Notification not found');
    }
    await this.notificationsRepository.delete(notificationId, userAccount.userId);
  }
}

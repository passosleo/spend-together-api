import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { UnreadNotificationResponseDTO } from '../../../infra/http/dtos/notification/unread-notification-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class GetUnreadNotificationsUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly notificationsRepository: INotificationRepository,
  ) {}

  public async execute(): Promise<UnreadNotificationResponseDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const total = await this.notificationsRepository.countByUser(userAccount.userId, { isRead: false });
    return UnreadNotificationResponseDTO.create({ hasUnread: total > 0, total });
  }
}

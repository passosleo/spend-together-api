import { ListNotificationsUseCase } from '../../../application/use-cases/notification/list-notifications-use-case';
import { NotificationRepositoryPrisma } from '../../data/repositories/notification-repository-prisma';
import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export class ListNotificationsUseCaseFactory {
  public static create(userAccount: UserAccountDTO): ListNotificationsUseCase {
    const authProvider = new AuthProvider(userAccount);
    const notificationRepository = new NotificationRepositoryPrisma();
    return new ListNotificationsUseCase(authProvider, notificationRepository);
  }
}

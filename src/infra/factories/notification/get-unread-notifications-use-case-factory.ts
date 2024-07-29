import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { GetUnreadNotificationsUseCase } from '../../../application/use-cases/notification/get-unread-notifications-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { NotificationRepositoryPrisma } from '../../data/repositories/notification-repository-prisma';

export class GetUnreadNotificationsUseCaseFactory {
  public static create(userAccount: UserAccountDTO): GetUnreadNotificationsUseCase {
    const authProvider = new AuthProvider(userAccount);
    const notificationsRepository = new NotificationRepositoryPrisma();
    return new GetUnreadNotificationsUseCase(authProvider, notificationsRepository);
  }
}

import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { DeleteNotificationUseCase } from '../../../application/use-cases/notification/delete-notification-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { NotificationRepositoryPrisma } from '../../data/repositories/notification-repository-prisma';

export class DeleteNotificationUseCaseFactory {
  public static create(userAccount: UserAccountDTO): DeleteNotificationUseCase {
    const authProvider = new AuthProvider(userAccount);
    const notificationsRepository = new NotificationRepositoryPrisma();
    return new DeleteNotificationUseCase(authProvider, notificationsRepository);
  }
}

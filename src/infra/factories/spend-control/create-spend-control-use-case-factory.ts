import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { CreateSpendControlUseCase } from '../../../application/use-cases/spend-control/create-spend-control-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { NotificationRepositoryPrisma } from '../../data/repositories/notification-repository-prisma';
import { SpendControlRepositoryPrisma } from '../../data/repositories/spend-control-repository-prisma';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class CreateSpendControlUseCaseFactory {
  public static create(userAccount: UserAccountDTO): CreateSpendControlUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlRepository = new SpendControlRepositoryPrisma();
    const notificationRepository = new NotificationRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    return new CreateSpendControlUseCase(authProvider, spendControlRepository, notificationRepository, userRepository);
  }
}

import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { ReplySpendControlInviteUseCase } from '../../../application/use-cases/spend-control-invite/reply-spend-control-invite-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { NotificationRepositoryPrisma } from '../../data/repositories/notification-repository-prisma';
import { SpendControlInviteRepositoryPrisma } from '../../data/repositories/spend-control-invite-repository-prisma';

export class ReplySpendControlInviteUseCaseFactory {
  public static create(userAccount: UserAccountDTO): ReplySpendControlInviteUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlInviteRepository = new SpendControlInviteRepositoryPrisma();
    const notificationRepository = new NotificationRepositoryPrisma();
    return new ReplySpendControlInviteUseCase(authProvider, spendControlInviteRepository, notificationRepository);
  }
}

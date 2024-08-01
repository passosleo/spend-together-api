import { Notification } from '../../../domain/entities/notification/notification';
import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { ISpendControlInviteRepository } from '../../../domain/repositories/spenc-control-invite/spend-control-invite-repository';
import { Exception } from '../../../infra/exception';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ReplySpendControlInviteUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlInviteRepository: ISpendControlInviteRepository,
    private readonly notificationRepository: INotificationRepository,
  ) {}

  public async execute(spendControlInviteId: string, isAccepted: boolean): Promise<void> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const invite = await this.spendControlInviteRepository.findOne(spendControlInviteId, userAccount.userId);

    if (!invite) {
      throw new Exception('NOT_FOUND', 'Invite not found');
    }

    if (invite.isAccepted) {
      throw new Exception('BAD_REQUEST', 'Invite already accepted');
    }

    await this.spendControlInviteRepository.update(spendControlInviteId, userAccount.userId, {
      isAccepted,
      isEnabled: false,
    });

    if (isAccepted) {
      await this.notificationRepository.create(
        Notification.create({
          userId: invite.ownerUserId,
          title: 'Convite aceito',
          content: `@${userAccount.username} aceitou o seu convite para ingressar no controle de gastos ${invite.spendControl.name}`,
        }),
      );
    } else {
      await this.notificationRepository.create(
        Notification.create({
          userId: invite.ownerUserId,
          title: 'Convite recusado',
          content: `@${userAccount.username} recusou o seu convite para ingressar no controle de gastos ${invite.spendControl.name}`,
        }),
      );
    }
  }
}

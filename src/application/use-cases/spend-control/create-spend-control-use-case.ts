import { UserAccountDTO } from './../../../domain/dtos/user/user-account-dto';
import { Notification } from '../../../domain/entities/notification/notification';
import { SpendControl } from '../../../domain/entities/spend-control/spend-control';
import { SpendControlUser } from '../../../domain/entities/spend-control/spend-control-user';
import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { Exception } from '../../../infra/exception';
import { CreateSpendControlRequestDTO } from '../../../infra/http/dtos/spend-control/create-spend-control-request-dto';
import { SpendControlResponseDTO } from '../../../infra/http/dtos/spend-control/spend-control-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class CreateSpendControlUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
    private readonly notificationRepository: INotificationRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(data: CreateSpendControlRequestDTO): Promise<SpendControlResponseDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();

    const invitedUsers = await this.createInvitedUsers(data.invitedUsernames, userAccount);

    const owner = SpendControlUser.create({
      user: userAccount,
      isOwner: true,
      invitedAt: new Date(),
      joinedAt: new Date(),
    });

    const createdSpendControl = await this.spendControlRepository.create(
      SpendControl.create({
        ...data,
        users: [owner, ...invitedUsers],
      }),
    );

    if (invitedUsers.length > 0) {
      await Promise.all(
        invitedUsers.map((invitedUser) =>
          this.notificationRepository.create(
            Notification.create({
              userId: invitedUser.user.userId,
              title: 'Você foi convidado para um controle de gastos',
              content: `Você foi convidado por @${userAccount.username} para participar do controle de gastos ${data.name}`,
              link: `/invites`,
            }),
          ),
        ),
      );
    }

    return SpendControlResponseDTO.create({
      ...createdSpendControl,
      balance: 0,
      totalSpent: 0,
      totalSpentByUser: 0,
      totalSpentByOthers: 0,
    });
  }

  private async createInvitedUsers(
    invitedUsernames: string[],
    userAccount: UserAccountDTO,
  ): Promise<SpendControlUser[]> {
    const isShared = invitedUsernames.length > 0;

    if (!isShared) {
      return [];
    }

    const filteredInvitedUsernames = invitedUsernames.filter((username) => username !== userAccount.username);

    const searchUsersPromises = filteredInvitedUsernames.map((username) =>
      this.userRepository.findByUniqueKey({ username }),
    );

    const searchResult = await Promise.all(searchUsersPromises);

    if (searchResult.some((user) => !user)) {
      throw new Exception('NOT_FOUND', 'Some invited users were not found');
    }

    const invitedUsers = searchResult.filter((user) => !!user);

    const hasInvalidUser = invitedUsers.some((invitedUser) => !invitedUser.isPublic);

    if (hasInvalidUser) {
      throw new Exception('FORBIDDEN', 'Some invited users profile are private');
    }

    return invitedUsers.map((invitedUser) =>
      SpendControlUser.create({
        user: invitedUser,
        isOwner: false,
        invitedAt: new Date(),
      }),
    );
  }
}

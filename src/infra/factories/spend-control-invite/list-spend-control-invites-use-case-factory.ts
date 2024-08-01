import { AuthProvider } from '../../../application/providers/auth/auth-provider';
import { ListSpendControlInvitesUseCase } from '../../../application/use-cases/spend-control-invite/list-spend-control-invites-use-case';
import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { SpendControlInviteRepositoryPrisma } from '../../data/repositories/spend-control-invite-repository-prisma';

export class ListSpendControlInvitesUseCaseFactory {
  public static create(userAccount: UserAccountDTO): ListSpendControlInvitesUseCase {
    const authProvider = new AuthProvider(userAccount);
    const spendControlInviteRepository = new SpendControlInviteRepositoryPrisma();
    return new ListSpendControlInvitesUseCase(authProvider, spendControlInviteRepository);
  }
}

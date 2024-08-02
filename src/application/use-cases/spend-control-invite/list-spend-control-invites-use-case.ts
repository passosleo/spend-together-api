import { ISpendControlInviteRepository } from '../../../domain/repositories/spenc-control-invite/spend-control-invite-repository';
import { SpendControlInviteResponseDTO } from '../../../infra/http/dtos/spend-control-invite/spend-control-invite-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ListSpendControlInvitesUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlInviteRepository: ISpendControlInviteRepository,
  ) {}

  public async execute(): Promise<SpendControlInviteResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const invites = await this.spendControlInviteRepository.findAll(userAccount.userId);
    return invites.map(SpendControlInviteResponseDTO.create);
  }
}

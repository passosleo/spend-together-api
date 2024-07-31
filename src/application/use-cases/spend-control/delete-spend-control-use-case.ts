import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { Exception } from '../../../infra/exception';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class DeleteSpendControlUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
  ) {}

  public async execute(spendControlId: string): Promise<void> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControl = await this.spendControlRepository.findOne(spendControlId, userAccount.userId);

    if (!spendControl) {
      throw new Exception('NOT_FOUND', 'Spend Control not found');
    }

    const owner = spendControl.users.find((item) => item.isOwner);

    if (!owner || owner.user.userId !== userAccount.userId) {
      throw new Exception('FORBIDDEN', 'User is not the owner of this spend control');
    }

    await this.spendControlRepository.delete(spendControlId);
  }
}

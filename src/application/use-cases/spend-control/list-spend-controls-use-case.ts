import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ListSpendControlsUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
  ) {}

  public async execute() {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControls = await this.spendControlRepository.findAll(userAccount.userId);
  }
}

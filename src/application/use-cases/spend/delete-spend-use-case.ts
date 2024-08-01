import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';
import { Exception } from '../../../infra/exception';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class DeleteSpendUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendRepository: ISpendRepository,
  ) {}

  public async execute(spendId: string): Promise<void> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spend = await this.spendRepository.findOne(spendId, userAccount.userId);
    if (!spend) {
      throw new Exception('NOT_FOUND', 'Spend not found');
    }
    await this.spendRepository.delete(spendId, userAccount.userId);
  }
}

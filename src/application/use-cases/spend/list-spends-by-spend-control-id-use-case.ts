import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';
import { SpendResponseDTO } from '../../../infra/http/dtos/spend/spend-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ListSpendsBySpendControlIdUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendRepository: ISpendRepository,
  ) {}

  public async execute(spendControlId: string): Promise<SpendResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spends = await this.spendRepository.findAll(spendControlId, userAccount.userId);
    return spends.map(SpendResponseDTO.create);
  }
}

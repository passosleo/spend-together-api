import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';
import { Exception } from '../../../infra/exception';
import { SpendResponseDTO } from '../../../infra/http/dtos/spend/spend-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class GetSpendByIdUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendRepository: ISpendRepository,
  ) {}

  public async execute(spendId: string): Promise<SpendResponseDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spend = await this.spendRepository.findOne(spendId, userAccount.userId);
    if (!spend) {
      throw new Exception('NOT_FOUND', 'Spend not found');
    }
    return SpendResponseDTO.create(spend);
  }
}

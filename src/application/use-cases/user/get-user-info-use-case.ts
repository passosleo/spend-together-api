import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { Exception } from '../../../infra/exception';
import { UserMapper } from '../../../infra/data/mappers/user-mapper';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class GetUserInfoUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<UserAccountDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const user = await this.userRepository.findByUniqueKey({ userId: userAccount.userId });
    if (!user) {
      throw new Exception('NOT_FOUND', 'User not found');
    }
    return UserMapper.toAccount(user);
  }
}

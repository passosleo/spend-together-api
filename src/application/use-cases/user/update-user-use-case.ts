import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { UpdateUserRequestDTO } from '../../../infra/http/dtos/user/update-user-request-dto';
import { UserMapper } from '../../../infra/data/mappers/user-mapper';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class UpdateUserUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(data: UpdateUserRequestDTO): Promise<UserAccountDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const user = await this.userRepository.update(userAccount.userId, data);
    return UserMapper.toAccount(user);
  }
}

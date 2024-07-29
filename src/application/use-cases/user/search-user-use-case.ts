import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { SearchUserRequestDTO } from '../../../infra/http/dtos/user/search-user-request-dto';
import { SearchUserResponseDTO } from '../../../infra/http/dtos/user/search-user-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class SearchUserUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute({ username }: SearchUserRequestDTO): Promise<SearchUserResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const users = await this.userRepository.findAllByUsername(username, userAccount.username);
    return users.map((user) => SearchUserResponseDTO.create(user));
  }
}

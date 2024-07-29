import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class DeleteUserAccountUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<void> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    await this.userRepository.delete(userAccount.userId);
  }
}

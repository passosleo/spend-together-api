import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';
import { IAuthProvider } from './auth-provider.types';

export class AuthProvider implements IAuthProvider {
  private readonly userAccount: UserAccountDTO;

  constructor(userAccount: UserAccountDTO) {
    this.userAccount = userAccount;
  }

  public getAuthenticatedUser(): UserAccountDTO {
    return this.userAccount;
  }
}

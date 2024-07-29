import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export interface IAuthProvider {
  getAuthenticatedUser(): UserAccountDTO;
}

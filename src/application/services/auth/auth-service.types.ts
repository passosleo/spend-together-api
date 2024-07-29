import { UserAccountDTO } from '../../../domain/dtos/user/user-account-dto';

export interface IAuthService {
  authenticate(email: string, password: string): Promise<UserAccountDTO>;
}

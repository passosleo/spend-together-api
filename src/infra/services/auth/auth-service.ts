import { IHelpers } from '../../../application/helpers/helpers.types';
import { IAuthService } from '../../../application/services/auth/auth-service.types';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { UserMapper } from '../../data/mappers/user-mapper';
import { Exception } from '../../exception';

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly helpers: IHelpers,
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findByUniqueKey({ email });
    if (!user) {
      throw new Exception('NOT_FOUND', 'User not found');
    }
    const { password: hashedPassword } = user;
    const isValidPassword = await this.helpers.password.validateHashedPassword(password, hashedPassword);
    if (!isValidPassword) {
      throw new Exception('UNAUTHORIZED', 'Invalid password');
    }
    return UserMapper.toAccount(user);
  }
}

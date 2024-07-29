import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { Exception } from '../../../infra/exception';
import { RecoverPasswordRequestDTO } from '../../../infra/http/dtos/sign-in/recover-password-request-dto';
import { IHelpers } from '../../helpers/helpers.types';

export class RecoverPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly helpers: IHelpers,
  ) {}

  public async execute(data: RecoverPasswordRequestDTO): Promise<void> {
    const { userId, expiresAt } = this.helpers.encryption.decrypt<{
      userId: string;
      expiresAt: Date;
    }>(data.token);

    if (!userId || this.helpers.date.isExpiredDate(expiresAt)) {
      throw new Exception('BAD_REQUEST', 'Invalid token');
    }

    if (!data.newPassword) {
      // Maybe should return user data
      return;
    }

    const hashedPassword = await this.helpers.password.hashPassword(data.newPassword);
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}

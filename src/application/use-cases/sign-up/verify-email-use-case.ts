import { VerifyEmailRequestDTO } from '../../../infra/http/dtos/sign-up/verify-email-request-dto';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { IHelpers } from '../../helpers/helpers.types';
import { Exception } from '../../../infra/exception';

export class VerifyEmailUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly helpers: IHelpers,
  ) {}

  public async execute(data: VerifyEmailRequestDTO): Promise<void> {
    const { userId, expiresAt } = this.helpers.encryption.decrypt<{
      userId: string;
      expiresAt: Date;
    }>(data.token);
    if (!userId || this.helpers.date.isExpiredDate(expiresAt)) {
      throw new Exception('BAD_REQUEST', 'Invalid token');
    }
    await this.userRepository.update(userId, { emailVerified: true });
  }
}

import { config } from '../../../config/app.config';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { Exception } from '../../../infra/exception';
import { SendVerifyEmailRequestDTO } from '../../../infra/http/dtos/sign-up/send-verify-email-request-dto';
import { IHelpers } from '../../helpers/helpers.types';
import { IMailService, MailTemplate } from '../../services/mail/mail-service.types';

export class SendVerifyEmailUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly helpers: IHelpers,
  ) {}

  public async execute(data: SendVerifyEmailRequestDTO): Promise<void> {
    const user = await this.userRepository.findByUniqueKey({ email: data.email });

    if (!user) {
      throw new Exception('NOT_FOUND', 'User not found');
    }

    const { userId, username, emailVerified, email } = user;

    if (emailVerified) {
      throw new Exception('BAD_REQUEST', 'Email already verified');
    }

    const verifyEmailToken = this.helpers.encryption.encrypt<{
      userId: string;
      expiresAt: Date;
    }>({
      userId,
      expiresAt: this.helpers.date.calculateExpiration({ minutes: 10 }),
    });

    const link = `${config.app.baseUrl}${config.redirects.verifyEmail}?token=${encodeURIComponent(verifyEmailToken)}`;

    const template = this.mailService.renderTemplate(MailTemplate.VERIFY_EMAIL, {
      username,
      link,
    });

    await this.mailService.sendMail({
      to: email,
      subject: 'Spend Together - Verification',
      body: template,
    });
  }
}

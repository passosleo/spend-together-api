import { config } from '../../../config/app.config';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { Exception } from '../../../infra/exception';
import { SendRecoverPasswordRequestDTO } from '../../../infra/http/dtos/sign-in/send-recover-password-request-dto';
import { IHelpers } from '../../helpers/helpers.types';
import { IMailService, MailTemplate } from '../../services/mail/mail-service.types';

export class SendRecoverPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailService: IMailService,
    private readonly helpers: IHelpers,
  ) {}

  public async execute(data: SendRecoverPasswordRequestDTO): Promise<void> {
    const user = await this.userRepository.findByUniqueKey({ email: data.email });

    if (!user) {
      throw new Exception('NOT_FOUND', 'User not found');
    }

    const { userId, username, email } = user;

    const recoverPasswordToken = this.helpers.encryption.encrypt({
      userId,
      expiresAt: this.helpers.date.calculateExpiration({ minutes: 10 }),
    });

    const link = `${config.app.baseUrl}${
      config.redirects.recoverPassword
    }?token=${encodeURIComponent(recoverPasswordToken)}`;

    const template = this.mailService.renderTemplate(MailTemplate.RECOVER_PASSWORD, {
      username,
      link,
    });

    await this.mailService.sendMail({
      to: email,
      subject: 'Spend Together - Recover password',
      body: template,
    });
  }
}

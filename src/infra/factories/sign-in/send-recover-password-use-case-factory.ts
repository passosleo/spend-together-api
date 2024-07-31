import { SendRecoverPasswordUseCase } from '../../../application/use-cases/sign-in/send-recover-password-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';
import { MailServiceNodemailer } from '../../services/mail/mail-service-nodemailer';

export class SendRecoverPasswordUseCaseFactory {
  public static create(): SendRecoverPasswordUseCase {
    const userRepository = new UserRepositoryPrisma();
    const mailService = new MailServiceNodemailer();
    const helpers = new Helpers();
    return new SendRecoverPasswordUseCase(userRepository, mailService, helpers);
  }
}

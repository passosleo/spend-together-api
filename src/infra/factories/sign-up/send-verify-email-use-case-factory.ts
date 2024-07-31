import { SendVerifyEmailUseCase } from '../../../application/use-cases/sign-up/send-verify-email-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { Helpers } from '../../helpers';
import { MailServiceNodemailer } from '../../services/mail/mail-service-nodemailer';

export class SendVerifyEmailUseCaseFactory {
  public static create(): SendVerifyEmailUseCase {
    const userRepository = new UserRepositoryPrisma();
    const mailService = new MailServiceNodemailer();
    const helpers = new Helpers();
    return new SendVerifyEmailUseCase(userRepository, mailService, helpers);
  }
}
